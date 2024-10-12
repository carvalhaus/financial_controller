const express = require("express");
const request = require("supertest");
const {
  validateCreateExpense,
  validateGetAllExpenses,
  validateUpdateExpense,
  validateDeleteExpense,
} = require("./expenseMiddleware");

const app = express();
app.use(express.json());

app.post("/expenses", validateCreateExpense, (req, res) => {
  res.status(201).json({ message: "Expense created successfully" });
});

app.get("/expenses/:userId", validateGetAllExpenses, (req, res) => {
  res.status(200).json({ message: "Expenses fetched successfully" });
});

app.put("/expenses/:id", validateUpdateExpense, (req, res) => {
  res.status(200).json({ message: "Expense updated successfully" });
});

app.delete("/expenses/:id", validateDeleteExpense, (req, res) => {
  res.status(200).json({ message: "Expense deleted successfully" });
});

describe("Expense Validation Middleware", () => {
  describe("POST /expenses (Create Expense)", () => {
    it("should return 201 if expense creation is valid", async () => {
      const response = await request(app).post("/expenses").send({
        amount: 100,
        name: "Valid expense",
        categoryId: "123e4567-e89b-12d3-a456-426614174000",
      });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Expense created successfully");
    });

    it("should return 400 if expense creation is invalid", async () => {
      const response = await request(app).post("/expenses").send({
        amount: -100,
        name: "Valid expense",
        categoryId: "invalid-uuid",
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("GET /expenses/:userId (Get All Expenses)", () => {
    it("should return 200 for valid userId", async () => {
      const response = await request(app).get(
        "/expenses/123e4567-e89b-12d3-a456-426614174000"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Expenses fetched successfully");
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app).get("/expenses/invalid-uuid");
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("PUT /expenses/:id (Update Expense)", () => {
    it("should return 200 if expense update is valid", async () => {
      const response = await request(app).put("/expenses/123").send({
        amount: 200,
        name: "Updated expense",
        id: "43369ac1-60ee-4525-a7cc-d19af6fe1710",
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Expense updated successfully");
    });

    it("should return 400 if expense update is invalid", async () => {
      const response = await request(app).put("/expenses/123").send({
        amount: -200,
        name: "Updated expense",
        id: "invalid-uuid",
      });
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("DELETE /expenses/:id (Delete Expense)", () => {
    it("should return 200 for valid expense ID", async () => {
      const response = await request(app).delete(
        "/expenses/123e4567-e89b-12d3-a456-426614174000"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Expense deleted successfully");
    });

    it("should return 400 for invalid expense ID", async () => {
      const response = await request(app).delete("/expenses/invalid-uuid");
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
