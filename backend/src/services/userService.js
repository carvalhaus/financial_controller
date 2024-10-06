const prisma = require("../config/prismaClient");

const userService = {
  getUser: async (userId) => {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
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

  updateUser: async (userData) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: userData.id },
      });

      if (!existingUser) {
        throw new Error("Usuário não encontrado");
      }

      const fieldsToUpdate = {};

      if (userData.username && userData.username !== existingUser.username) {
        fieldsToUpdate.username = userData.username;
      }

      if (userData.name && userData.name !== existingUser.name) {
        fieldsToUpdate.name = userData.name;
      }

      if (userData.birthday && userData.birthday !== existingUser.birthday) {
        fieldsToUpdate.birthday = userData.birthday;
      }

      if (Object.keys(fieldsToUpdate).length === 0) {
        console.log("Nenhuma alteração foi feita");
        return existingUser;
      }

      const updatedUser = await prisma.user.update({
        where: { id: userData.id },
        data: fieldsToUpdate,
      });

      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      throw error;
    }
  },
};

module.exports = userService;
