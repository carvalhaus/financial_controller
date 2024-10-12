// tests/createJwt.test.js
const createJwt = require("./createJwt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

describe("createJwt", () => {
  const user = {
    id: "12345",
    email: "test@example.com",
  };

  it("should create a valid JWT token", () => {
    const token = createJwt(user);

    const decoded = jwt.verify(token, process.env.PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    expect(decoded).toHaveProperty("userId", user.id);
    expect(decoded).toHaveProperty("email", user.email);
  });

  it("should throw an error for an invalid token", () => {
    const invalidToken = "invalid-token";

    expect(() => {
      jwt.verify(invalidToken, process.env.PUBLIC_KEY);
    }).toThrow();
  });

  it("should generate a token with an expiration time", () => {
    const token = createJwt(user);

    const decoded = jwt.verify(token, process.env.PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    expect(decoded).toHaveProperty("exp");
    const currentTime = Math.floor(Date.now() / 1000);
    expect(decoded.exp).toBeGreaterThan(currentTime);
  });
});
