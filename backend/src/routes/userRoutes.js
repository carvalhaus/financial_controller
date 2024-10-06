const express = require("express");
const validateGetUser = require("../middleware/validateGetUser");
const authenticateJwt = require("../middleware/authenticateJwt");
const userController = require("../controllers/userController");

const router = express.Router();

router.get(
  "/api/users/:userId",
  authenticateJwt,
  validateGetUser,
  userController.getUser
);

module.exports = router;
