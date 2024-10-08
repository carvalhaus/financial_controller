const express = require("express");
const { validateCreateExpense } = require("../middleware/expenseMiddleware");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.post(
  "/api/expenses/create",
  validateCreateExpense,
  expenseController.createExpense
);

module.exports = router;
