// tests/categorySchemas.test.js
const {
  getCategories,
  getCategory,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} = require("./categoryModel");
const { ZodError } = require("zod");

describe("Category Model", () => {
  describe("getCategories schema", () => {
    it("should validate a valid UUID", () => {
      const validData = { userId: "550e8400-e29b-41d4-a716-446655440000" };
      expect(() => getCategories.parse(validData)).not.toThrow();
    });

    it("should throw an error for an invalid UUID", () => {
      const invalidData = { userId: "invalid-uuid" };
      expect(() => getCategories.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("getCategory schema", () => {
    it("should validate a valid UUID", () => {
      const validData = { id: "550e8400-e29b-41d4-a716-446655440000" };
      expect(() => getCategory.parse(validData)).not.toThrow();
    });

    it("should throw an error for an invalid UUID", () => {
      const invalidData = { id: "invalid-uuid" };
      expect(() => getCategory.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("createCategorySchema", () => {
    it("should validate a valid category data", () => {
      const validData = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
        icon: "👍",
        name: "Groceries",
        amount: 100.5,
      };
      expect(() => createCategorySchema.parse(validData)).not.toThrow();
    });

    it("should throw an error if name is too short", () => {
      const invalidData = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
        icon: "👍",
        name: "abc",
        amount: 100.5,
      };
      expect(() => createCategorySchema.parse(invalidData)).toThrow(ZodError);
    });

    it("should throw an error if amount is negative", () => {
      const invalidData = {
        userId: "550e8400-e29b-41d4-a716-446655440000",
        icon: "👍",
        name: "Groceries",
        amount: -50,
      };
      expect(() => createCategorySchema.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("updateCategorySchema", () => {
    it("should validate a valid category update", () => {
      const validData = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        icon: "👍",
        name: "Utilities",
        amount: 200,
      };
      expect(() => updateCategorySchema.parse(validData)).not.toThrow();
    });

    it("should throw an error for invalid icon", () => {
      const invalidData = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        icon: "",
        name: "Utilities",
        amount: 200,
      };
      expect(() => updateCategorySchema.parse(invalidData)).toThrow(ZodError);
    });
  });

  describe("deleteCategorySchema", () => {
    it("should validate a valid id for deletion", () => {
      const validData = { id: "550e8400-e29b-41d4-a716-446655440000" };
      expect(() => deleteCategorySchema.parse(validData)).not.toThrow();
    });

    it("should throw an error for an invalid id", () => {
      const invalidData = { id: "invalid-uuid" };
      expect(() => deleteCategorySchema.parse(invalidData)).toThrow(ZodError);
    });
  });
});
