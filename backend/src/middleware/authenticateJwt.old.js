// tests/authenticateJWT.test.js
const express = require("express");
const request = require("supertest");
const authenticateJWT = require("./authenticateJwt");
const createJwt = require("../utils/createJwt");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(require("cookie-parser")());

app.get("/protected", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Access granted.", user: req.user });
});

describe("JWT Authentication Middleware", () => {
  let validToken;

  const user = {
    id: "12345",
    email: "test@example.com",
  };

  beforeAll(() => {
    validToken = createJwt(user);
  });

  it("should allow access with a valid token", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Cookie", `token=${validToken}`);

    expect(response.status).toBe(200);
    expect(response.json).toEqual({
      message: "Access granted.",
      user: { id: "12345", email: "test@example.com" },
    });
  });

  it("should deny access without a token", async () => {
    const response = await request(app).get("/protected");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Acesso negado." });
  });

  it("should deny access with an invalid token", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Cookie", "token=invalid-token");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Token inválido." });
  });
});
