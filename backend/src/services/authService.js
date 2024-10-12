const prisma = require("../config/prismaClient");
require("dotenv").config();

const authService = {
  async registerUser(email, hashedPassword) {
    let username = this._extractUsername(email);

    try {
      if (await this._isEmailRegistered(email)) {
        throw new Error("E-mail já registrado!");
      }

      if (await this._isUsernameTaken(username)) {
        username = this._generateUniqueUsername(username);
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
        },
      });

      delete newUser.password;
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async loginUser(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("E-mail ou senha inválidos!");
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  _extractUsername(email) {
    return email.split("@")[0];
  },

  async _isEmailRegistered(email) {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new Error("Failed to check email registration.");
    }
  },

  async _isUsernameTaken(username) {
    try {
      return await prisma.user.findUnique({ where: { username } });
    } catch (error) {
      throw new Error("Failed to check username availability.");
    }
  },

  _generateUniqueUsername(username) {
    return `${username}_${Math.floor(Math.random() * 10000)}`;
  },
};

const googleOAuthService = {
  async getGoogleOAuthTokens({ code }) {
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const tokenBody = this._buildOAuthRequestBody(code);

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: tokenBody.toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve Google OAuth tokens.");
      }

      const tokenData = await response.json();
      return tokenData;
    } catch (error) {
      throw new Error("Failed to retrieve Google OAuth tokens.");
    }
  },

  async getGoogleUser({ id_token, access_token }) {
    const userUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

    try {
      const response = await fetch(userUrl, {
        headers: { Authorization: `Bearer ${id_token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve Google user data.");
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to retrieve Google user data.");
    }
  },

  async upsertGoogleUser(email, name) {
    let username = this._extractUsername(email);

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        delete existingUser.password;
        return existingUser;
      }

      if (await this._isUsernameTaken(username)) {
        username = this._generateUniqueUsername(username);
      }

      return await prisma.user.upsert({
        where: { email },
        update: { name, username },
        create: { email, name, username },
      });
    } catch (error) {
      throw new Error("Failed to upsert Google user.");
    }
  },

  _extractUsername(email) {
    return email.split("@")[0];
  },

  _buildOAuthRequestBody(code) {
    return new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      grant_type: "authorization_code",
    });
  },

  async _isUsernameTaken(username) {
    try {
      return await prisma.user.findUnique({ where: { username } });
    } catch (error) {
      throw new Error("Failed to check username availability.");
    }
  },

  _generateUniqueUsername(username) {
    return `${username}_${Math.floor(Math.random() * 10000)}`;
  },
};

module.exports = { authService, googleOAuthService };
