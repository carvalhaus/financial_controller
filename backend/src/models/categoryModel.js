const { z } = require("zod");

const uuidSchema = z.string().uuid();
const nameSchema = z
  .string()
  .min(4, { message: "O nome deve ter no mínimo 4 caracteres." });
const iconSchema = z.string().emoji({ message: "O ícone é obrigatório" });
const amountSchema = z
  .number()
  .positive({ message: "O valor deve ser positivo." });

const getCategories = z.object({
  userId: uuidSchema,
});

const getCategory = z.object({
  id: uuidSchema,
});

const createCategorySchema = z.object({
  userId: uuidSchema,
  icon: iconSchema,
  name: nameSchema,
  amount: amountSchema,
});

const updateCategorySchema = z.object({
  id: uuidSchema,
  icon: iconSchema,
  name: nameSchema,
  amount: amountSchema,
});

const deleteCategorySchema = z.object({
  id: uuidSchema,
});

module.exports = {
  getCategories,
  getCategory,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
