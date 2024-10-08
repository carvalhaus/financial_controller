const userService = require("../services/userService");

const userController = {
  getUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const userData = await userService.getUser(userId);

      res.status(200).json({
        message: "Dados do usuário recebidos com sucesso!",
        userData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userData = await userService.updateUser(req.body);

      res.status(200).json({
        message: "Dados do usuário atualizados com sucesso!",
        userData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
