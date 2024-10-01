const userService = require("../services/userService");
const hashPassword = require("../utils/hashPassword");
const bcrypt = require("bcryptjs");

const userController = {
  register: async (req, res) => {
    const { email, password } = req.body;

    try {
      const hashedPassword = await hashPassword(password);

      const newUser = await userService.registerUser(email, hashedPassword);

      res
        .status(201)
        .json({ message: "Usuário registrado com sucesso!", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userService.loginUser(email);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Senha incorreta!" });
      }

      res
        .status(200)
        .json({ message: "Login bem-sucedido!", user: { email: user.email } });
    } catch (error) {
      res.status(500).json({ error: "Erro ao logar usuário." });
    }
  },
};

module.exports = userController;
