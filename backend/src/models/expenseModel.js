const { z } = require("zod");

const uuidSchema = z.string().uuid();
const nameSchema = z
  .string()
  .min(4, { message: "O nome deve ter no mínimo 4 caracteres." });
const amountSchema = z
  .number()
  .positive({ message: "O valor deve ser positivo." });

const createExpenseSchema = z.object({
  name: nameSchema,
  amount: amountSchema,
  categoryId: uuidSchema,
});

const getAllExpensesSchema = z.object({
  userId: uuidSchema,
});

const updateExpenseSchema = z.object({
  id: uuidSchema,
  name: nameSchema,
  amount: amountSchema,
});

const deleteExpenseSchema = z.object({
  id: uuidSchema,
});

module.exports = {
  createExpenseSchema,
  getAllExpensesSchema,
  updateExpenseSchema,
  deleteExpenseSchema,
};
