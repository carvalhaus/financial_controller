const express = require("express");
const request = require("supertest");
const { validateInvitFriend } = require("./invitFriendMiddleware");

const app = express();
app.use(express.json());

app.post("/invite", validateInvitFriend, (req, res) => {
  res.status(200).json({ message: "Friend invited successfully" });
});

describe("Invite Friend Validation Middleware", () => {
  describe("POST /invite", () => {
    it("should return 200 when email and name are valid", async () => {
      const response = await request(app)
        .post("/invite")
        .send({ email: "test@example.com", name: "John Doe" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Friend invited successfully");
    });

    it("should return 400 when email is invalid", async () => {
      const response = await request(app)
        .post("/invite")
        .send({ email: "invalid-email", name: "John Doe" });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe("O e-mail deve ser válido.");
    });

    it("should return 400 when email is missing", async () => {
      const response = await request(app)
        .post("/invite")
        .send({ name: "John Doe" });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe("O e-mail é obrigatório.");
    });

    it("should return 400 when name is missing", async () => {
      const response = await request(app)
        .post("/invite")
        .send({ email: "test@example.com" });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe("O nome é obrigatório.");
    });

    it("should return 400 when name is less than 4 character", async () => {
      const response = await request(app)
        .post("/invite")
        .send({ email: "test@example.com", name: "" });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toBe(
        "O nome deve ter pelo menos 4 caracteres."
      );
    });
  });
});
