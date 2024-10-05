const prisma = require("../config/prismaClient");

const userService = {
  getUser: async (email) => {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        birthday: true,
        expenses: {
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
        },
        categories: {
          take: 3,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!existingUser) {
      throw new Error("Usuário não cadastrado!");
    }

    return existingUser;
  },
};

module.exports = userService;
