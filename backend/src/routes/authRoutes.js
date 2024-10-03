const express = require("express");
const validateRegisterUser = require("../middleware/validateRegisterUser");
const validateLoginUser = require("../middleware/validateLoginUser");
const userController = require("../controllers/userController");
const authenticateJWT = require("../middleware/authenticateJwt");

const router = express.Router();

router.post(
  "/api/sessions/register",
  validateRegisterUser,
  userController.register
);

router.post("/api/sessions/login", validateLoginUser, userController.login);

module.exports = router;
