const registerUserSchema = require("../models/user");

const validateRegisterUser = (req, res, next) => {
  try {
    registerUserSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

module.exports = validateRegisterUser;
