const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/authRoutes");

const app = express();
app.use(express.json());
app.use(authRoutes);

describe("Auth Routes", () => {
  const mockRegister = jest.fn((req, res) =>
    res.status(201).json({ message: "User registered successfully" })
  );
  const mockLogin = jest.fn((req, res) =>
    res.status(200).json({ message: "User logged in successfully" })
  );
  const mockGoogleOAuthHandler = jest.fn((req, res) =>
    res.status(200).json({ message: "Google OAuth successful" })
  );

  beforeAll(() => {
    authRoutes.stack.forEach((route) => {
      if (route.route.path === "/api/sessions/register") {
        route.route.stack[0].handle = mockRegister;
      }
      if (route.route.path === "/api/sessions/login") {
        route.route.stack[0].handle = mockLogin;
      }
      if (route.route.path === "/api/sessions/oauth/google") {
        route.route.stack[0].handle = mockGoogleOAuthHandler;
      }
    });
  });

  test("POST /api/sessions/register - Success", async () => {
    const response = await request(app)
      .post("/api/sessions/register")
      .send({ username: "testuser", password: "testpass" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User registered successfully" });
  });

  test("POST /api/sessions/login - Success", async () => {
    const response = await request(app)
      .post("/api/sessions/login")
      .send({ username: "testuser", password: "testpass" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "User logged in successfully" });
  });

  test("GET /api/sessions/oauth/google - Success", async () => {
    const response = await request(app).get("/api/sessions/oauth/google");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Google OAuth successful" });
  });
});
