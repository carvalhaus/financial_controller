const { z } = require("zod");

const invitFriendSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório.",
    })
    .email({ message: "O e-mail deve ser válido." }),
  name: z
    .string({
      required_error: "O nome é obrigatório.",
    })
    .min(4, { message: "O nome deve ter pelo menos 4 caracteres." }),
});

module.exports = invitFriendSchema;
