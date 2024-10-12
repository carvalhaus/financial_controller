const { authService, googleOAuthService } = require("../services/authService");
const hashPassword = require("../utils/hashPassword");
const createJwt = require("../utils/createJwt");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const authController = {
  register: async (req, res) => {
    const { email, password } = req.body;

    try {
      const hashedPassword = await hashPassword(password);

      const newUser = await authService.registerUser(email, hashedPassword);

      const token = createJwt(newUser);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
        sameSite: "strict",
      });

      res.status(201).json({
        message: "Usuário registrado com sucesso!",
        user: { email: newUser.email },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await authService.loginUser(email);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "E-mail ou senha inválidos!" });
      }

      const token = createJwt(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
        sameSite: "strict",
      });

      res.status(200).json({
        message: "Login bem-sucedido!",
        user: { email: user.email },
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

const googleOAuthHandler = async (req, res) => {
  const code = req.query.code;

  try {
    const { id_token, access_token } =
      await googleOAuthService.getGoogleOAuthTokens({ code });

    const googleUser = await googleOAuthService.getGoogleUser({
      id_token,
      access_token,
    });

    const { email, name } = googleUser;

    const user = await googleOAuthService.upsertGoogleUser(email, name);

    const token = createJwt(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
      sameSite: "strict",
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    res.redirect(process.env.FRONTEND_URL);
  }
};

module.exports = { authController, googleOAuthHandler };
