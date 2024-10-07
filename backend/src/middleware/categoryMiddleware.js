const { ZodError } = require("zod");
const {
  createCategorySchema,
  getCategories,
  getCategory,
} = require("../models/categoryModel");

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

const validateGetCategories = (req, res, next) => {
  try {
    const { userId } = req.params;

    getCategories.parse({ userId });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

const validateGetCategory = (req, res, next) => {
  try {
    const { id } = req.params;

    getCategory.parse({ id });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

module.exports = {
  validateCreateCategory,
  validateGetCategories,
  validateGetCategory,
};
