const express = require("express");
const { validateInvitFriend } = require("../middleware/invitFriendMiddleware");
const invitFriendController = require("../controllers/invitFriendController");

const router = express.Router();

router.post(
  "/invit-friend",
  validateInvitFriend,
  invitFriendController.sendInvitation
);

module.exports = router;
