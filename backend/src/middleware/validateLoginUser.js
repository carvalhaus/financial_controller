const { loginUserSchema } = require("../models/authModel");
const { ZodError } = require("zod");

const validateLoginUser = (req, res, next) => {
  try {
    loginUserSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

module.exports = validateLoginUser;
