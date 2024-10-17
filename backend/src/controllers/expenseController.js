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

  getAllExpenses: async (req, res) => {
    const { userId } = req.params;
    try {
      const expenses = await expenseService.getAllExpenses(userId);

      res.status(200).json({
        message:
          expenses.length > 0
            ? "Despesas recebidas com sucesso!"
            : "Nenhuma despesa cadastrada.",
        expenses,
      });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  },

  updateExpense: async (req, res) => {
    try {
      const updateExpense = await expenseService.updateExpense(req.body);

      res.status(200).json({
        message: "Despesa editada com sucesso!",
        updateExpense,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteExpense: async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await expenseService.deleteExpense(id);

      res.status(200).json({
        message: "Despesa deletada com sucesso!",
        expense,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = expenseController;
