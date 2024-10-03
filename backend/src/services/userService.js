const prisma = require("../config/prismaClient");

const userService = {
  async registerUser(email, hashedPassword) {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new Error("E-mail já registrado!");
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
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

module.exports = userService;
