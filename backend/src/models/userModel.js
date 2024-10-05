const { z } = require("zod");

const getUserSchema = z.object({
  email: z.string().email({ message: "O e-mail dever ser válido" }),
});

module.exports = getUserSchema;
