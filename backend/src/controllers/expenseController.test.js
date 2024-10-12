const request = require("supertest");
const express = require("express");
const expenseController = require("./expenseController");
const app = express();

app.use(express.json());

app.post("/api/expenses/create", expenseController.createExpense);
app.get("/api/expenses/:userId", expenseController.getAllExpenses);
app.put("/api/expenses/update", expenseController.updateExpense);
app.delete("/api/expenses/expense/delete/:id", expenseController.deleteExpense);

jest.mock("../services/expenseService");

const expenseService = require("../services/expenseService");

describe("Expense Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createExpense - success", async () => {
    const validExpenseBody = {
      name: "Sorvete",
      amount: 50,
      categoryId: "128921c7-702e-481e-82cb-99f80bbb525d",
    };

    const mockExpense = {
      id: "1",
      ...validExpenseBody,
    };

    expenseService.createExpense.mockResolvedValue(mockExpense);

    const response = await request(app)
      .post("/api/expenses/create")
      .send(validExpenseBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Despesa criada com sucesso!");
    expect(response.body.createdExpense).toEqual(mockExpense);
  });

  test("createExpense - error", async () => {
    const errorMessage = "Falha ao criar despesa!";
    expenseService.createExpense.mockRejectedValue(new Error(errorMessage));

    const validExpenseBody = {
      name: "Sorvete",
      amount: 50,
      categoryId: "128921c7-702e-481e-82cb-99f80bbb525d",
    };

    const response = await request(app)
      .post("/api/expenses/create")
      .send(validExpenseBody);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(errorMessage);
  });

  test("getAllExpenses - success", async () => {
    const mockExpenses = [
      { id: "1", name: "Dinner", amount: 50 },
      { id: "2", name: "Groceries", amount: 100 },
    ];

    expenseService.getAllExpenses.mockResolvedValue(mockExpenses);

    const response = await request(app).get("/api/expenses/12345");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Despesas recebidas com sucesso!");
    expect(response.body.expenses).toEqual(mockExpenses);
  });

  test("getAllExpenses - error", async () => {
    const errorMessage = "Failed to retrieve expenses";
    expenseService.getAllExpenses.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get("/api/expenses/12345");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(errorMessage);
  });

  test("updateExpense - success", async () => {
    const updatedExpense = {
      name: "Sorvete",
      amount: 50,
      categoryId: "128921c7-702e-481e-82cb-99f80bbb525d",
    };

    expenseService.updateExpense.mockResolvedValue(updatedExpense);

    const response = await request(app)
      .put("/api/expenses/update")
      .send(updatedExpense);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Despesa editada com sucesso!");
    expect(response.body.updateExpense).toEqual(updatedExpense);
  });

  test("updateExpense - error", async () => {
    const errorMessage = "Failed to update expense";
    expenseService.updateExpense.mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .put("/api/expenses/update")
      .send({ id: "1", name: "Dinner Updated", amount: 60 });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(errorMessage);
  });

  test("deleteExpense - success", async () => {
    const mockDeletedExpense = { id: "1", name: "Dinner", amount: 50 };

    expenseService.deleteExpense.mockResolvedValue(mockDeletedExpense);

    const response = await request(app).delete(
      "/api/expenses/expense/delete/1"
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Despesa deletada com sucesso!");
    expect(response.body.expense).toEqual(mockDeletedExpense);
  });

  test("deleteExpense - error", async () => {
    const errorMessage = "Failed to delete expense";
    expenseService.deleteExpense.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).delete(
      "/api/expenses/expense/delete/1"
    );

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(errorMessage);
  });
});
