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
      console.error("Erro ao buscar despesas:", error);
      throw new Error("Não foi possível recuperar as despesas.");
    }
  },

  updateExpense: async (expense) => {
    try {
      const { id, name, amount } = expense;

      const existingExpense = prisma.expense.findUnique({
        where: {
          id,
        },
      });

      if (!existingExpense) {
        throw new Error("Despesa não encontrada!");
      }

      const fieldsToUpdate = {};

      if (name && name !== existingExpense.name) {
        fieldsToUpdate.name = name;
      }

      if (amount && amount !== existingExpense.amount) {
        fieldsToUpdate.amount = amount;
      }

      if (Object.keys(fieldsToUpdate).length === 0) {
        console.log("Nenhuma alteração foi feita");
        return existingExpense;
      }

      const updatedExpense = await prisma.expense.update({
        where: { id },
        data: fieldsToUpdate,
      });

      return updatedExpense;
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
      throw new Error("Não foi possível recuperar as despesas.");
    }
  },
};

module.exports = expenseService;
