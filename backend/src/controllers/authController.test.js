const request = require("supertest");
const express = require("express");
const { authController, googleOAuthHandler } = require("./authController");
const { authService, googleOAuthService } = require("../services/authService");
const hashPassword = require("../utils/hashPassword");
const createJwt = require("../utils/createJwt");
const bcrypt = require("bcryptjs");
require("dotenv").config();

jest.mock("../services/authService");
jest.mock("../utils/hashPassword");
jest.mock("../utils/createJwt");
jest.mock("bcryptjs");

const app = express();
app.use(express.json());
app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/auth/google/callback", googleOAuthHandler);

describe("authController", () => {
  describe("register", () => {
    it("should register a user and set a JWT cookie", async () => {
      const mockUser = { email: "test@example.com" };
      hashPassword.mockResolvedValue("hashedPassword");
      authService.registerUser.mockResolvedValue(mockUser);
      createJwt.mockReturnValue("mockedJwtToken");

      const res = await request(app)
        .post("/register")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Usuário registrado com sucesso!");
      expect(res.body.user.email).toBe("test@example.com");
      expect(res.headers["set-cookie"]).toBeDefined();
      expect(hashPassword).toHaveBeenCalledWith("password123");
      expect(authService.registerUser).toHaveBeenCalledWith(
        "test@example.com",
        "hashedPassword"
      );
      expect(createJwt).toHaveBeenCalledWith(mockUser);
    });

    it("should return 500 if registration fails", async () => {
      hashPassword.mockRejectedValue(new Error("Failed to hash password"));

      const res = await request(app)
        .post("/register")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Failed to hash password");
    });
  });

  describe("login", () => {
    it("should log in a user and set a JWT cookie", async () => {
      const mockUser = {
        email: "test@example.com",
        password: "hashedPassword",
      };
      authService.loginUser.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      createJwt.mockReturnValue("mockedJwtToken");

      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Login bem-sucedido!");
      expect(res.body.user.email).toBe("test@example.com");
      expect(res.body.token).toBe("mockedJwtToken");
      expect(res.headers["set-cookie"]).toBeDefined();
      expect(authService.loginUser).toHaveBeenCalledWith("test@example.com");
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashedPassword"
      );
      expect(createJwt).toHaveBeenCalledWith(mockUser);
    });

    it("should return 400 for invalid password", async () => {
      const mockUser = {
        email: "test@example.com",
        password: "hashedPassword",
      };
      authService.loginUser.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "wrongPassword" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("E-mail ou senha inválidos!");
    });

    it("should return 500 if login fails", async () => {
      authService.loginUser.mockRejectedValue(new Error("Failed to login"));

      const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Failed to login");
    });
  });
});

describe("googleOAuthHandler", () => {
  it("should handle Google OAuth login and redirect to dashboard", async () => {
    googleOAuthService.getGoogleOAuthTokens.mockResolvedValue({
      id_token: "mockedIdToken",
      access_token: "mockedAccessToken",
    });

    googleOAuthService.getGoogleUser.mockResolvedValue({
      email: `${process.env.GOOGLE_EMAIL_TEST}`,
      name: "Google User",
    });

    googleOAuthService.upsertGoogleUser.mockResolvedValue({
      email: `${process.env.GOOGLE_EMAIL_TEST}`,
    });

    createJwt.mockReturnValue("mockedJwtToken");

    const res = await request(app)
      .get("/auth/google/callback")
      .query({ code: "mockedCode" });

    expect(res.status).toBe(302); // 302 is the status code for redirection
    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.headers["location"]).toBe(
      `${process.env.FRONTEND_URL}/dashboard`
    );
    expect(googleOAuthService.getGoogleOAuthTokens).toHaveBeenCalledWith({
      code: "mockedCode",
    });
    expect(googleOAuthService.getGoogleUser).toHaveBeenCalledWith({
      id_token: "mockedIdToken",
      access_token: "mockedAccessToken",
    });
    expect(googleOAuthService.upsertGoogleUser).toHaveBeenCalledWith(
      `${process.env.GOOGLE_EMAIL_TEST}`,
      "Google User"
    );
    expect(createJwt).toHaveBeenCalledWith({
      email: `${process.env.GOOGLE_EMAIL_TEST}`,
    });
  });

  it("should return 500 if OAuth flow fails", async () => {
    googleOAuthService.getGoogleOAuthTokens.mockRejectedValue(
      new Error("Failed to fetch tokens")
    );

    const res = await request(app)
      .get("/auth/google/callback")
      .query({ code: "invalidCode" });

    expect(res.status).toBe(302);
    expect(res.headers["location"]).toBe(process.env.FRONTEND_URL);
  });
});
