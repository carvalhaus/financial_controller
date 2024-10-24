const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Token received:", token);

  if (!token) {
    return res.status(403).json({ error: "Acesso negado." });
  }

  try {
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
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authenticateJWT;
