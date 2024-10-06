const express = require("express");
const { validateRegisterUser } = require("../middleware/authMiddleware");
const { validateLoginUser } = require("../middleware/authMiddleware");
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
