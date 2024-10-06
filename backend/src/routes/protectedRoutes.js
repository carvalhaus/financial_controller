const express = require("express");
const authenticateJwt = require("../middleware/authenticateJwt");

const router = express.Router();

router.get("/protected", authenticateJwt, (req, res) => {
  res.status(200).json({
    message: "Você acessou uma rota protegida!",
    userId: req.user.userId,
  });
});

module.exports = router;
