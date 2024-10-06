const { z } = require("zod");

const getUserSchema = z.object({
  userId: z.string().uuid(),
});

module.exports = getUserSchema;
