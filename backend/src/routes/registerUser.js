const express = require("express");
const prisma = require("../config/prismaClient");
const validateRegisterUser = require("../middleware/validateRegisterUser");
const hashPassword = require("../utils/hashPassword");

const router = express.Router();

router.post(
  "/api/sessions/register",
  validateRegisterUser,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingEmail = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingEmail) {
        return res.status(400).json({ error: "E-mail já registrado!" });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });

      delete newUser.password;

      res
        .status(201)
        .json({ message: "Usuário registrado com sucesso!", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário." });
    }
  }
);

module.exports = router;
