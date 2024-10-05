const prisma = require("../config/prismaClient");
require("dotenv").config();

const userService = {
  async registerUser(email, hashedPassword) {
    let username = email.split("@")[0];

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new Error("E-mail já registrado!");
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      username = `${username}_${Math.floor(Math.random() * 10000)}`;
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
  },

  async loginUser(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("E-mail ou senha inválidos!");
    }

    return user;
  },
};

const googleOAuthService = {
  async getGoogleOAuthTokens({ code }) {
    const tokenUrl = "https://oauth2.googleapis.com/token";

    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      grant_type: "authorization_code",
    };

    const qs = new URLSearchParams(values);

    try {
      const res = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.toString(),
      });

      const data = await res.json();

      return data;
    } catch (error) {
      console.error("Error fetching Google OAuth tokens:", error.message);
      throw error;
    }
  },

  async getGoogleUser({ id_token, access_token }) {
    const userUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

    try {
      const res = await fetch(userUrl, {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      });

      const data = await res.json();

      return data;
    } catch (error) {
      console.error("Error fetching Google OAuth users:", error.message);
      throw error;
    }
  },

  async upsertGoogleUser(email, name) {
    let username = email.split("@")[0];

    try {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        username = `${username}_${Math.floor(Math.random() * 10000)}`;
      }

      const user = await prisma.user.upsert({
        where: { email },
        update: {
          name,
          username,
        },
        create: {
          email,
          name,
          username,
        },
      });

      return user;
    } catch (error) {
      console.error("Error upserting Google user:", error.message);
      throw error;
    }
  },
};

module.exports = { userService, googleOAuthService };
