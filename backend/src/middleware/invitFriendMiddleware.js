const { ZodError } = require("zod");
const invitFriendSchema = require("../models/invitFriendModel");

const validateInvitFriend = (req, res, next) => {
  try {
    invitFriendSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

module.exports = { validateInvitFriend };
