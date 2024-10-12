// tests/authMiddleware.test.js
const express = require("express");
const request = require("supertest");
const { validateRegisterUser, validateLoginUser } = require("./authMiddleware");

const app = express();
app.use(express.json());

app.post("/register", validateRegisterUser, (req, res) => {
  res.status(200).json({ message: "Usuário registrado com sucesso" });
});

app.post("/login", validateLoginUser, (req, res) => {
  res.status(200).json({ message: "Usuário logado com sucesso" });
});

describe("Auth Middleware", () => {
  describe("Register User Validation", () => {
    it("should pass with valid data for registration", async () => {
      const validRegisterData = {
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password123",
      };

      const response = await request(app)
        .post("/register")
        .send(validRegisterData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Usuário registrado com sucesso",
      });
    });

    it("should return 400 with invalid email for registration", async () => {
      const invalidRegisterData = {
        email: "invalid-email",
        password: "Password123",
        confirmPassword: "Password123",
      };

      const response = await request(app)
        .post("/register")
        .send(invalidRegisterData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe("O e-mail deve ser válido");
    });

    it("should return 400 when password and confirmPassword do not match", async () => {
      const passwordMismatchData = {
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password456",
      };

      const response = await request(app)
        .post("/register")
        .send(passwordMismatchData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe("As senhas devem coincidir");
    });
  });

  describe("Login User Validation", () => {
    it("should pass with valid data for login", async () => {
      const validLoginData = {
        email: "test@example.com",
        password: "Password123",
      };

      const response = await request(app).post("/login").send(validLoginData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Usuário logado com sucesso",
      });
    });

    it("should return 400 with invalid data for login", async () => {
      const invalidLoginData = {
        email: "invalid-email",
        password: "short",
      };

      const response = await request(app).post("/login").send(invalidLoginData);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBeDefined();
    });
  });
});
