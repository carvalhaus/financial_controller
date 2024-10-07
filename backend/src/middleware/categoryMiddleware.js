const { ZodError } = require("zod");
const { createCategorySchema } = require("../models/categoryModel");

const validateCreateCategory = (req, res, next) => {
  try {
    createCategorySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

module.exports = { validateCreateCategory };
