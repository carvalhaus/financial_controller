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
};

module.exports = categoryService;
