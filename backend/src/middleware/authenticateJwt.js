const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ error: "Acesso negado." });
  }

  jwt.verify(
    token,
    process.env.PUBLIC_KEY,
    { algorithms: ["RS256"] },
    (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido." });
      }
      req.user = user;
      next();
    }
  );
};

module.exports = authenticateJWT;
