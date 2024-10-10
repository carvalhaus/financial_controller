const express = require("express");
const {
  validateCreateExpense,
  validateGetAllExpenses,
  validateUpdateExpense,
  validateDeleteExpense,
} = require("../middleware/expenseMiddleware");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.post(
  "/api/expenses/create",
  validateCreateExpense,
  expenseController.createExpense
);

router.get(
  "/api/expenses/:userId",
  validateGetAllExpenses,
  expenseController.getAllExpenses
);

router.put(
  "/api/expenses/update",
  validateUpdateExpense,
  expenseController.updateExpense
);

router.delete(
  "/api/expenses/expense/delete/:id",
  validateDeleteExpense,
  expenseController.deleteExpense
);

module.exports = router;
