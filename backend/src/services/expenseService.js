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
};

module.exports = expenseService;
