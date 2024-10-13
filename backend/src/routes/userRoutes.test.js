const request = require("supertest");
const express = require("express");
const userRoutes = require("./userRoutes");

const app = express();
app.use(express.json());
app.use(userRoutes);

describe("User Routes", () => {
  const mockGetUser = jest.fn((req, res) =>
    res.status(200).json({ id: req.params.userId, name: "John Doe" })
  );
  const mockUpdateUser = jest.fn((req, res) =>
    res.status(200).json({ message: "User updated successfully" })
  );

  beforeAll(() => {
    userRoutes.stack.forEach((route) => {
      if (route.route.path === "/api/users/:userId") {
        route.route.stack[0].handle = mockGetUser;
      }
      if (route.route.path === "/api/users/update") {
        route.route.stack[0].handle = mockUpdateUser;
      }
    });
  });

  test("GET /api/users/:userId - Success", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: "1", name: "John Doe" });
  });

  test("PUT /api/users/update - Success", async () => {
    const response = await request(app)
      .put("/api/users/update")
      .send({ id: "1", name: "Jane Doe" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "User updated successfully" });
  });
});
