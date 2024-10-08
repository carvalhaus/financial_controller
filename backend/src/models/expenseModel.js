const { z } = require("zod");

const createExpenseSchema = z.object({
  name: z.string().min(4),
  amount: z.number(),
  categoryId: z.string().uuid(),
});

module.exports = { createExpenseSchema };
