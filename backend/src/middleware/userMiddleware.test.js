const express = require("express");
const request = require("supertest");
const { validateGetUser, validateUpdateUser } = require("./userMiddleware");

const app = express();
app.use(express.json());

app.get("/users/:userId", validateGetUser, (req, res) => {
  res.status(200).json({ message: "User fetched successfully" });
});

app.put("/users/:userId", validateUpdateUser, (req, res) => {
  res.status(200).json({ message: "User updated successfully" });
});

describe("User Validation Middleware", () => {
  describe("GET /users/:userId (Get User)", () => {
    it("should return 200 when userId is valid", async () => {
      const response = await request(app).get(
        "/users/123e4567-e89b-12d3-a456-426614174000"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User fetched successfully");
    });

    it("should return 400 when userId is invalid", async () => {
      const response = await request(app).get("/users/invalid-id");
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("PUT /users/:userId (Update User)", () => {
    it("should return 200 when update data is valid", async () => {
      const response = await request(app)
        .put("/users/123e4567-e89b-12d3-a456-426614174000")
        .send({
          id: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
          username: "newjohn",
          name: "John Doe",
          birthday: "2024-10-03T03:00:00.000Z",
        });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User updated successfully");
    });

    it("should return 400 when update data is invalid", async () => {
      const response = await request(app)
        .put("/users/123e4567-e89b-12d3-a456-426614174000")
        .send({
          id: "invalid-id",
          username: "newjohn",
          name: "J",
          birthday: "2024-10-03T03:00:00.000Z",
        });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
