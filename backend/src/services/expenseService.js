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
      console.error("Erro ao buscar categorias:", error);
      throw new Error("Não foi possível recuperar as categorias.");
    }
  },
};

module.exports = expenseService;
