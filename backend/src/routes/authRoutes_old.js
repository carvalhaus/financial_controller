const express = require("express");
const { googleOAuthHandler } = require("../controllers/authController");

const router = express.Router();

router.get("/api/sessions/oauth/google", googleOAuthHandler);

module.exports = router;
