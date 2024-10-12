const { PrismaClient } = require("@prisma/client");
const expenseService = require("./expenseService");

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    expense: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    category: {
      findUnique: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe("Expense Service", () => {
  const prisma = new PrismaClient();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createExpense", () => {
    const expenseData = {
      name: "Sorvete",
      amount: 50,
      categoryId: "f27b7903-4a3f-4f2c-8cbb-afc32720ba81",
    };

    it("should create and return an expense when category is found", async () => {
      const categoryData = { userId: 1 };

      prisma.category.findUnique.mockResolvedValue(categoryData);
      prisma.expense.create.mockResolvedValue(expenseData);

      const result = await expenseService.createExpense(expenseData);

      expect(result).toEqual(expenseData);
      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: expenseData.categoryId },
        include: { User: true },
      });
      expect(prisma.expense.create).toHaveBeenCalledWith({
        data: { ...expenseData, userId: categoryData.userId },
      });
    });

    it("should throw an error if category not found", async () => {
      prisma.category.findUnique.mockResolvedValue(null);

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow(
        "Categoria não encontrada!"
      );
    });
  });

  describe("getAllExpenses", () => {
    const userId = "c00cce64-76a2-4708-9275-55f7620d7cc6";

    it("should return all expenses for a user", async () => {
      const expensesData = [
        { id: 1, name: "Groceries", amount: 100 },
        { id: 2, name: "Utilities", amount: 50 },
      ];

      prisma.expense.findMany.mockResolvedValue(expensesData);

      const result = await expenseService.getAllExpenses(userId);

      expect(result).toEqual(expensesData);
      expect(prisma.expense.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    });

    it("should throw an error if no expenses found", async () => {
      prisma.expense.findMany.mockResolvedValue([]);

      await expect(expenseService.getAllExpenses(userId)).rejects.toThrow(
        "Usuário não possui nenhuma despesa cadastrada!"
      );
    });
  });

  describe("updateExpense", () => {
    it("should update expense data and return updated expense", async () => {
      const existingExpense = {
        id: "f27b7903-4a3f-4f2c-8cbb-afc32720ba81",
        name: "Old Expense",
        amount: 100,
      };

      const updatedData = {
        id: "f27b7903-4a3f-4f2c-8cbb-afc32720ba81",
        name: "New Expense",
        amount: 150,
      };

      prisma.expense.findUnique.mockResolvedValue(existingExpense);

      prisma.expense.update.mockResolvedValue({
        ...existingExpense,
        ...updatedData,
      });

      const result = await expenseService.updateExpense(updatedData);

      expect(result).toEqual({ ...existingExpense, ...updatedData });
      expect(prisma.expense.update).toHaveBeenCalledWith({
        where: { id: updatedData.id },
        data: { name: "New Expense", amount: 150 },
      });
    });

    it("should throw an error if the expense does not exist", async () => {
      prisma.expense.findUnique.mockResolvedValue(null);

      await expect(
        expenseService.updateExpense({ id: "non-existing-id" })
      ).rejects.toThrow("Despesa não encontrada!");
    });

    it("should not update if no changes are made", async () => {
      const existingExpense = {
        id: "f27b7903-4a3f-4f2c-8cbb-afc32720ba81",
        name: "Same Expense",
        amount: 100,
      };

      prisma.expense.findUnique.mockResolvedValue(existingExpense);

      const result = await expenseService.updateExpense(existingExpense);

      expect(result).toEqual(existingExpense);

      expect(prisma.expense.update).not.toHaveBeenCalled();
    });
  });

  describe("deleteExpense", () => {
    const expenseId = "6b5d03ba-a60a-48d0-b8d0-b9e597f250f0";

    it("should delete an expense", async () => {
      const existingExpense = { id: expenseId };

      prisma.expense.findUnique.mockResolvedValue(existingExpense);
      prisma.expense.delete.mockResolvedValue(existingExpense);

      await expenseService.deleteExpense(expenseId);
      expect(prisma.expense.delete).toHaveBeenCalledWith({
        where: { id: existingExpense.id },
      });
    });

    it("should throw an error if expense not found", async () => {
      prisma.expense.findUnique.mockResolvedValue(null);

      await expect(expenseService.deleteExpense(expenseId)).rejects.toThrow(
        "Despesa não cadastrada ou já deletada!"
      );
    });
  });
});
