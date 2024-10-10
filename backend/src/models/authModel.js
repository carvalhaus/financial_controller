const { z } = require("zod");

const emailSchema = z.string().email({ message: "O e-mail deve ser válido" });
const passwordSchema = z
  .string()
  .min(6, { message: "A senha deve ter no mínimo 6 caracteres" });

const registerUserSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem coincidir",
    path: ["confirmPassword"],
  });

const loginUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

module.exports = { registerUserSchema, loginUserSchema };
