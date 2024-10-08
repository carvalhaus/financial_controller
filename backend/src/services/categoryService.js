const prisma = require("../config/prismaClient");

const categoryService = {
  createCategory: async (category) => {
    const { name, amount, icon, userId } = category;

    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      throw new Error("Categoria já existe!");
    }

    const newCategory = await prisma.category.create({
      data: {
        userId,
        icon,
        name,
        amount,
      },
    });

    return newCategory;
  },

  getCategories: async (userId) => {
    try {
      const categories = await prisma.category.findMany({
        where: {
          userId: userId,
        },
        include: {
          Expense: true,
        },
      });

      if (categories.length === 0) {
        throw new Error("Usuário não possui nenhuma categoria cadastrada!");
      }

      const processedCategories = categories.map((category) => {
        const totalSpent = category.Expense.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        const totalExpenses = category.Expense.length;

        return {
          ...category,
          totalSpent,
          totalExpenses,
        };
      });

      return processedCategories;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw new Error("Não foi possível recuperar as categorias.");
    }
  },

  getCategory: async (id) => {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          Expense: true,
        },
      });

      if (!category) {
        throw new Error("Categoria não cadastrada!");
      }

      const totalSpent = category.Expense.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      const totalExpenses = category.Expense.length;

      return {
        ...category,
        totalSpent,
        totalExpenses,
      };
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
      throw new Error("Não foi possível recuperar a categoria.");
    }
  },

  updateCategory: async (category) => {
    const { id, name, amount, icon } = category;

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new Error("Categoria não encontrada!");
    }

    const fieldsToUpdate = {};

    if (name && name !== existingCategory.name) {
      fieldsToUpdate.name = name;
    }

    if (amount && amount !== existingCategory.amount) {
      fieldsToUpdate.amount = amount;
    }

    if (icon && icon !== existingCategory.icon) {
      fieldsToUpdate.birthday = icon;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      console.log("Nenhuma alteração foi feita");
      return existingCategory;
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: fieldsToUpdate,
    });

    return updatedCategory;
  },
};

module.exports = categoryService;
