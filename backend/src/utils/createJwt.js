const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJwt = (user) => {
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.PRIVATE_KEY,
    { algorithm: "RS256", expiresIn: "1h" }
  );

  return token;
};

module.exports = createJwt
