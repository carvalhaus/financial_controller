const prisma = require("../config/prismaClient");

const userService = {
  getUser: async (userId) => {
    try {
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
            select: {
              id: true,
              name: true,
              amount: true,
              createdAt: true,
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          categories: {
            take: 3,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              name: true,
              createdAt: true,
              amount: true,
              icon: true,
              _count: {
                select: { Expense: true },
              },
              Expense: {
                select: {
                  amount: true,
                },
              },
            },
          },
        },
      });

      if (!existingUser) {
        throw new Error("Usuário não cadastrado!");
      }

      const allCategories = await prisma.category.findMany({
        where: { userId },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          amount: true,
          icon: true,
          _count: {
            select: { Expense: true },
          },
          Expense: {
            select: {
              amount: true,
            },
          },
        },
      });

      const categoriesWithTotals = existingUser.categories.map((category) => {
        const totalSpent = category.Expense.reduce(
          (total, expense) => total + expense.amount,
          0
        );
        return {
          ...category,
          totalSpent,
        };
      });

      const allCategoriesWithTotals = allCategories.map((category) => {
        const totalSpent = category.Expense.reduce(
          (total, expense) => total + expense.amount,
          0
        );
        return {
          ...category,
          totalSpent,
        };
      });

      return {
        ...existingUser,
        categories: categoriesWithTotals,
        allCategories: allCategoriesWithTotals,
      };
    } catch (error) {
      throw new Error(error.message);
    }
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
      throw new Error(error.message);
    }
  },
};

module.exports = userService;
