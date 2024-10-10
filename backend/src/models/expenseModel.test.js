// tests/expenseSchemas.test.js
const {
  createExpenseSchema,
  getAllExpensesSchema,
  updateExpenseSchema,
  deleteExpenseSchema,
} = require("./expenseModel");
const { ZodError } = require("zod");

describe("Expense Model", () => {
  describe("createExpenseSchema", () => {
    it("should validate a valid expense data", () => {
      const validData = {
        name: "Groceries",
        amount: 150.5,
        categoryId: "550e8400-e29b-41d4-a716-446655440000",
      };
      expect(() => createExpenseSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error if name is too short", () => {
      const invalidData = {
        name: "abc",
        amount: 150.5,
        categoryId: "550e8400-e29b-41d4-a716-446655440000",
      };
      expect(() => createExpenseSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if amount is negative", () => {
      const invalidData = {
        name: "Groceries",
        amount: -50,
        categoryId: "550e8400-e29b-41d4-a716-446655440000",
      };
      expect(() => createExpenseSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if categoryId is not a valid UUID", () => {
      const invalidData = {
        name: "Groceries",
        amount: 150.5,
        categoryId: "invalid-uuid",
      };
      expect(() => createExpenseSchema.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("getAllExpensesSchema", () => {
    it("should validate a valid UUID", () => {
      const validData = { userId: "550e8400-e29b-41d4-a716-446655440000" };
      expect(() => getAllExpensesSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error if userId is not a valid UUID", () => {
      const invalidData = { userId: "invalid-uuid" };
      expect(() => getAllExpensesSchema.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("updateExpenseSchema", () => {
    it("should validate a valid expense update", () => {
      const validData = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Utilities",
        amount: 200.75,
      };
      expect(() => updateExpenseSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error if amount is negative", () => {
      const invalidData = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Utilities",
        amount: -100,
      };
      expect(() => updateExpenseSchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if id is not a valid UUID", () => {
      const invalidData = {
        id: "invalid-uuid",
        name: "Utilities",
        amount: 200.75,
      };
      expect(() => updateExpenseSchema.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("deleteExpenseSchema", () => {
    it("should validate a valid UUID for deletion", () => {
      const validData = { id: "550e8400-e29b-41d4-a716-446655440000" };
      expect(() => deleteExpenseSchema.parse(validData)).not.toThrow();
    });

    it("should throw an error if id is not a valid UUID", () => {
      const invalidData = { id: "invalid-uuid" };
      expect(() => deleteExpenseSchema.parse(invalidData)).toThrow(ZodError);
    });
  });
});
