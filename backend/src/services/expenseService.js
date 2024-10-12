const prisma = require("../config/prismaClient");

const expenseService = {
  createExpense: async (expense) => {
    const { name, amount, categoryId } = expense;

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { User: true },
    });

    if (!category) {
      throw new Error("Categoria não encontrada!");
    }

    const userId = category.userId;

    const newExpense = await prisma.expense.create({
      data: {
        name,
        amount,
        categoryId,
        userId,
      },
    });

    return newExpense;
  },

  getAllExpenses: async (userId) => {
    try {
      const expenses = await prisma.expense.findMany({
        where: {
          userId,
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (expenses.length === 0) {
        throw new Error("Usuário não possui nenhuma despesa cadastrada!");
      }

      return expenses;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateExpense: async (expense) => {
    try {
      const existingExpense = await prisma.expense.findUnique({
        where: { id: expense.id },
      });

      if (!existingExpense) {
        throw new Error("Despesa não encontrada!");
      }

      const fieldsToUpdate = {};

      if (expense.name && expense.name !== existingExpense.name) {
        fieldsToUpdate.name = expense.name;
      }

      if (expense.amount && expense.amount !== existingExpense.amount) {
        fieldsToUpdate.amount = expense.amount;
      }

      if (Object.keys(fieldsToUpdate).length === 0) {
        console.log("Nenhuma alteração foi feita");
        return existingExpense;
      }

      const updatedExpense = await prisma.expense.update({
        where: { id: expense.id },
        data: fieldsToUpdate,
      });

      return updatedExpense;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteExpense: async (id) => {
    try {
      const existingExpense = await prisma.expense.findUnique({
        where: {
          id,
        },
      });

      if (!existingExpense) {
        throw new Error("Despesa não cadastrada ou já deletada!");
      }

      await prisma.expense.delete({
        where: {
          id: existingExpense.id,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = expenseService;
