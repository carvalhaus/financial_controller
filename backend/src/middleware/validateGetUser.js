const getUserSchema = require("../models/userModel");
const { ZodError } = require("zod");

const validateGetUser = (req, res, next) => {
  try {
    getUserSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

module.exports = validateGetUser;
