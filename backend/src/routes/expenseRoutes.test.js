const request = require("supertest");
const express = require("express");
const expenseRoutes = require("../routes/expenseRoutes");
const app = express();
app.use(express.json());
app.use(expenseRoutes);

describe("Expense Routes", () => {
  const mockCreateExpense = jest.fn((req, res) =>
    res.status(201).json({ message: "Expense created successfully" })
  );
  const mockGetAllExpenses = jest.fn((req, res) =>
    res.status(200).json([{ id: 1, amount: 100, description: "Test Expense" }])
  );
  const mockUpdateExpense = jest.fn((req, res) =>
    res.status(200).json({ message: "Expense updated successfully" })
  );
  const mockDeleteExpense = jest.fn((req, res) => res.status(204).send());

  beforeAll(() => {
    expenseRoutes.stack.forEach((route) => {
      if (route.route.path === "/api/expenses/create") {
        route.route.stack[0].handle = mockCreateExpense;
      }
      if (route.route.path === "/api/expenses/:userId") {
        route.route.stack[0].handle = mockGetAllExpenses;
      }
      if (route.route.path === "/api/expenses/update") {
        route.route.stack[0].handle = mockUpdateExpense;
      }
      if (route.route.path === "/api/expenses/expense/delete/:id") {
        route.route.stack[0].handle = mockDeleteExpense;
      }
    });
  });

  test("POST /api/expenses/create - Success", async () => {
    const response = await request(app)
      .post("/api/expenses/create")
      .send({ amount: 100, description: "New Expense" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Expense created successfully" });
  });

  test("GET /api/expenses/:userId - Success", async () => {
    const response = await request(app).get("/api/expenses/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, amount: 100, description: "Test Expense" },
    ]);
  });

  test("PUT /api/expenses/update - Success", async () => {
    const response = await request(app)
      .put("/api/expenses/update")
      .send({ id: 1, amount: 150, description: "Updated Expense" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Expense updated successfully" });
  });

  test("DELETE /api/expenses/expense/delete/:id - Success", async () => {
    const response = await request(app).delete(
      "/api/expenses/expense/delete/1"
    );

    expect(response.status).toBe(204);
  });
});
