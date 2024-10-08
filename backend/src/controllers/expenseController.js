const expenseService = require("../services/expenseService");

const expenseController = {
  createExpense: async (req, res) => {
    try {
      const createdExpense = await expenseService.createExpense(req.body);

      res.status(200).json({
        message: "Despesa criada com sucesso!",
        createdExpense,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = expenseController;
