const { PrismaClient } = require("@prisma/client");
const categoryService = require("./categoryService");

// Mock the Prisma Client
jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    category: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    expense: {
      deleteMany: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe("Category Service Tests", () => {
  const prisma = new PrismaClient();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock history after each test
  });

  describe("createCategory", () => {
    it("should create a new category successfully with valid body", async () => {
      const validCategory = {
        id: "5d1bc189-a823-4327-9964-39ccc994416d",
        icon: "🙄",
        name: "Teste criar categoria",
        amount: 1600,
        createdAt: "2024-10-12T19:29:29.575Z",
        userId: "704223ef-6986-400e-9851-737f0d34976c",
      };

      prisma.category.findFirst.mockResolvedValue(null);

      prisma.category.create.mockResolvedValue(validCategory);

      const result = await categoryService.createCategory(validCategory);

      expect(result).toEqual({
        id: expect.any(String),
        name: "Teste criar categoria",
        amount: 1600,
        icon: "🙄",
        createdAt: "2024-10-12T19:29:29.575Z",
        userId: "704223ef-6986-400e-9851-737f0d34976c",
      });
    });

    it("should throw an error if category already exists", async () => {
      const existingCategory = {
        name: "Teste criar categoria",
      };

      prisma.category.findFirst.mockResolvedValue(existingCategory);

      await expect(
        categoryService.createCategory(existingCategory)
      ).rejects.toThrow("Categoria já existe!");
    });
  });

  describe("getCategories", () => {
    it("should retrieve categories successfully", async () => {
      const userId = "704223ef-6986-400e-9851-737f0d34976c";
      const categories = [
        {
          id: "85ae01a9-bfda-45d0-9936-21b6891a4368",
          name: "Teste criar categoria",
          amount: 1600,
          icon: "🙄",
          createdAt: "2024-10-12T19:30:43.102Z",
          userId: "704223ef-6986-400e-9851-737f0d34976c",
          Expense: [],
          totalSpent: 0,
          totalExpenses: 0,
        },
      ];

      prisma.category.findMany.mockResolvedValue(categories);

      const result = await categoryService.getCategories(userId);
      expect(result).toEqual([
        {
          id: "85ae01a9-bfda-45d0-9936-21b6891a4368",
          name: "Teste criar categoria",
          amount: 1600,
          icon: "🙄",
          createdAt: "2024-10-12T19:30:43.102Z",
          userId: "704223ef-6986-400e-9851-737f0d34976c",
          Expense: [],
          totalSpent: 0,
          totalExpenses: 0,
        },
      ]);
    });

    it("should throw an error if no categories are found", async () => {
      const userId = "invalid_uuid";
      prisma.category.findMany.mockResolvedValue([]);

      await expect(categoryService.getCategories(userId)).rejects.toThrow(
        "Usuário não possui nenhuma categoria cadastrada!"
      );
    });
  });

  describe("getCategory", () => {
    it("should retrieve a category successfully", async () => {
      const id = "85ae01a9-bfda-45d0-9936-21b6891a4368";

      const categoryData = {
        id: "85ae01a9-bfda-45d0-9936-21b6891a4368",
        name: "Teste criar categoria",
        amount: 1600,
        icon: "🙄",
        createdAt: new Date(), // Using new Date() for createdAt
        userId: "704223ef-6986-400e-9851-737f0d34976c",
        Expense: [],
        totalSpent: 0,
        totalExpenses: 0,
      };

      prisma.category.findUnique.mockResolvedValue(categoryData);

      const result = await categoryService.getCategory(id);
      expect(result).toEqual(categoryData);
    });

    it("should throw an error if category is not found", async () => {
      const userId = "invalid_uuid";
      prisma.category.findUnique.mockResolvedValue(null);

      await expect(categoryService.getCategory(userId)).rejects.toThrow(
        "Categoria não cadastrada!"
      );
    });
  });

  describe("updateCategory", () => {
    it("should update an existing category successfully", async () => {
      const updatedData = {
        id: "85ae01a9-bfda-45d0-9936-21b6891a4368",
        name: "Teste criar categoria",
        amount: 1600,
        icon: "🙄",
      };
      const existingCategory = {
        id: "85ae01a9-bfda-45d0-9936-21b6891a4368",
        name: "Teste criar categoria",
        amount: 1600,
        icon: "🙄",
      };
      prisma.category.findUnique.mockResolvedValue(existingCategory);
      prisma.category.update.mockResolvedValue(updatedData);

      const result = await categoryService.updateCategory(updatedData);
      expect(result).toEqual(updatedData);
    });

    it("should throw an error if category is not found", async () => {
      const updatedData = {
        id: "invalid_uuid",
        name: "Moradia",
        amount: 1800,
        icon: "🙄",
      };
      prisma.category.findUnique.mockResolvedValue(null);

      await expect(categoryService.updateCategory(updatedData)).rejects.toThrow(
        "Categoria não encontrada!"
      );
    });

    it("should not update if no changes are made", async () => {
      const existingCategory = {
        id: "85ae01a9-bfda-45d0-9936-21b6891a4368",
        name: "Teste criar categoria",
        amount: 1600,
        icon: "🙄",
      };
      prisma.category.findUnique.mockResolvedValue(existingCategory);

      const result = await categoryService.updateCategory(existingCategory);
      expect(result).toEqual(existingCategory);
    });
  });

  describe("deleteCategory", () => {
    it("should delete an existing category and its expenses", async () => {
      const id = "85ae01a9-bfda-45d0-9936-21b6891a4368";

      prisma.category.findUnique.mockResolvedValue(id);
      prisma.expense.deleteMany.mockResolvedValue({
        where: {
          categoryId: id,
        },
      });
      prisma.category.delete.mockResolvedValue({ where: { id } });

      const result = await categoryService.deleteCategory(id);
      expect(result).toEqual({
        message: "Categoria e despesas deletadas com sucesso!",
      });
    });

    it("should throw an error if category is not found", async () => {
      const invalidCategory = "invalid_uuid";

      prisma.category.findUnique.mockResolvedValue(null);

      await expect(
        categoryService.deleteCategory(invalidCategory)
      ).rejects.toThrow("Categoria não cadastrada!");
    });
  });
});
