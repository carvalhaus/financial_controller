const { ZodError } = require("zod");
const { createExpenseSchema } = require("../models/expenseModel");

const validateCreateExpense = (req, res, next) => {
  try {
    createExpenseSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

module.exports = { validateCreateExpense };
