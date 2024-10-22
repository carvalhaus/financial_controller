const express = require("express");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("./authenticateJwt"); // Adjust the path as necessary
require("dotenv").config();

jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());

app.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "Access granted" });
});

describe("authenticateJWT Middleware", () => {
  beforeAll(() => {
    publicKey = process.env.PUBLIC_KEY;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should deny access if no token is provided", async () => {
    const response = await request(app).get("/protected");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Acesso negado." });
  });

  test("should deny access if token is invalid", async () => {
    jwt.verify.mockImplementation((token, secret, options, callback) => {
      callback(new Error("Invalid token"), null);
    });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalidToken"); // Sending the token in the Authorization header

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Token inválido." });
  });

  test("should grant access if token is valid", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    jwt.verify.mockImplementation((token, secret, options, callback) => {
      callback(null, mockUser);
    });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validToken"); // Sending the token in the Authorization header

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Access granted" });
  });

  test("should return 500 if an error occurs during token verification", async () => {
    jwt.verify.mockImplementation((token, secret, options, callback) => {
      throw new Error("Verification error");
    });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validToken"); // Sending the token in the Authorization header

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});
