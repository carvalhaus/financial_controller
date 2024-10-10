const { z } = require("zod");

const uuidSchema = z.string().uuid();

const dateSchema = z.preprocess(
  (arg) => {
    const date = arg instanceof Date ? arg : new Date(arg);
    return isNaN(date.getTime()) ? undefined : date;
  },
  z.date({
    required_error: "A data de nascimento é obrigatória.",
    invalid_type_error: "Data de nascimento inválida.",
  })
);

const birthdaySchema = dateSchema.refine((date) => date <= new Date(), {
  message: "A data de nascimento não pode estar no futuro.",
});

const getUserSchema = z.object({
  userId: uuidSchema,
});

const updateUserSchema = z.object({
  id: uuidSchema,
  username: z
    .string()
    .min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres." }),
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  birthday: birthdaySchema,
});

module.exports = { getUserSchema, updateUserSchema };
