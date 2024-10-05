const express = require("express");
const validateRegisterUser = require("../middleware/validateRegisterUser");
const validateLoginUser = require("../middleware/validateLoginUser");
const {
  authController,
  googleOAuthHandler,
} = require("../controllers/authController");

const router = express.Router();

router.post(
  "/api/sessions/register",
  validateRegisterUser,
  authController.register
);

router.post("/api/sessions/login", validateLoginUser, authController.login);

router.get("/api/sessions/oauth/google", googleOAuthHandler);

module.exports = router;
