const { z } = require("zod");

const createCategorySchema = z.object({
  userId: z.string().uuid(),
  icon: z.string(),
  name: z.string().min(4),
  amount: z.number(),
});

module.exports = { createCategorySchema };
