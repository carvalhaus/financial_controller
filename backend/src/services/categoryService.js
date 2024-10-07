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
      });

      if (categories.length === 0) {
        throw new Error("Usuário não possui nenhuma categoria cadastrada!");
      }

      return categories;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw new Error("Não foi possível recuperar as categorias.");
    }
  },
};

module.exports = categoryService;
