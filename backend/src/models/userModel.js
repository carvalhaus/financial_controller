const { z } = require("zod");

const getUserSchema = z.object({
  userId: z.string().uuid(),
});

const updateUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  name: z.string(),
  birthday: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      }
    },
    z.date({
      required_error: "A data de nascimento é obrigatória.",
      invalid_type_error: "Data de nascimento inválida.",
    })
  ),
});

module.exports = { getUserSchema, updateUserSchema };
