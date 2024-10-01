const { z } = require("zod");

const registerUserSchema = z
  .object({
    email: z.string().email({ message: "O e-mail dever ser válido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string().min(6, {
      message: "A confirmação de senha deve ter no mínimo 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem coincidir",
    path: ["confirmPassword"],
  });

module.exports = registerUserSchema;
