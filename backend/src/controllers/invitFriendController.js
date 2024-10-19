const { sendEmail } = require("../services/invitFriendService");

const invitFriendController = {
  sendInvitation: async (req, res) => {
    try {
      const { email, name } = req.body;

      await sendEmail(email, name);

      const userData = { email, name };

      res.status(200).json({
        message: "Convite enviado com sucesso!",
        userData,
      });
    } catch (error) {
      console.error("Error sending invitation:", error);
      res
        .status(500)
        .json({ error: "Erro ao enviar o convite. Tente novamente." });
    }
  },
};

module.exports = invitFriendController;
