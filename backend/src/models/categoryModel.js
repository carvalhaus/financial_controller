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

module.exports = { getCategories, getCategory, createCategorySchema };
