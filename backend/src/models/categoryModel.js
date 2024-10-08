const { z } = require("zod");

const getCategories = z.object({
  userId: z.string().uuid(),
});

const getCategory = z.object({
  id: z.string().uuid(),
});

const createCategorySchema = z.object({
  userId: z.string().uuid(),
  icon: z.string(),
  name: z.string().min(4),
  amount: z.number(),
});

const updateCategorySchema = z.object({
  id: z.string().uuid(),
  icon: z.string(),
  name: z.string().min(4),
  amount: z.number(),
});

const deleteCategorySchema = z.object({
  id: z.string().uuid(),
});

module.exports = {
  getCategories,
  getCategory,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
