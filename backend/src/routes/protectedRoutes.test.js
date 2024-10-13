const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const protectedRoutes = require("./protectedRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use(protectedRoutes); // Use the protected routes

const PRIVATE_KEY = process.env.PRIVATE_KEY;

describe("Protected Routes", () => {
  it("should return 200 and a message when the token is valid", async () => {
    const token = jwt.sign({ userId: "12345" }, PRIVATE_KEY, {
      algorithm: "RS256",
    });

    const response = await request(app)
      .get("/protected")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Você acessou uma rota protegida!",
      userId: "12345",
    });
  });

  it("should return 403 when the token is invalid", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Cookie", "token=invalid_token");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("error", "Token inválido.");
  });

  it("should return 403 when no token is provided", async () => {
    const response = await request(app).get("/protected");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("error", "Acesso negado.");
  });
});
