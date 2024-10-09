const express = require("express");
const {
  validateCreateExpense,
  validateGetAllExpenses,
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

module.exports = router;
