const { z } = require("zod");

const createExpenseSchema = z.object({
  name: z.string().min(4),
  amount: z.number(),
  categoryId: z.string().uuid(),
});

const getAllExpensesSchema = z.object({
  userId: z.string().uuid(),
});

const updateExpenseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  amount: z.number(),
});

module.exports = { createExpenseSchema, getAllExpensesSchema, updateExpenseSchema };
