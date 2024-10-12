const { PrismaClient } = require("@prisma/client");
const userService = require("./userService");

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe("userService", () => {
  const prisma = new PrismaClient();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUser", () => {
    it("should return user data with categories and totals when user exists", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
        username: "testuser",
        birthday: "1990-01-01",
        expenses: [],
        categories: [
          {
            id: "cat1",
            name: "Food",
            createdAt: new Date(),
            amount: 100,
            icon: "🍔",
            Expense: [{ amount: 30 }, { amount: 20 }],
          },
        ],
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.getUser("1");

      expect(result).toEqual({
        ...mockUser,
        categories: [
          {
            ...mockUser.categories[0],
            totalSpent: 50,
          },
        ],
      });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
        select: expect.any(Object),
      });
    });

    it("should throw an error if the user does not exist", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(userService.getUser("non-existing-id")).rejects.toThrow(
        "Usuário não cadastrado!"
      );
    });
  });

  describe("updateUser", () => {
    it("should update user data and return updated user", async () => {
      const existingUser = {
        id: "1",
        username: "oldusername",
        name: "Old Name",
        birthday: "1990-01-01",
      };

      const updatedData = {
        id: "1",
        username: "newusername",
        name: "New Name",
        birthday: "1990-01-01",
      };

      prisma.user.findUnique.mockResolvedValue(existingUser);
      prisma.user.update.mockResolvedValue({ ...existingUser, ...updatedData });

      const result = await userService.updateUser(updatedData);

      expect(result).toEqual({ ...existingUser, ...updatedData });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: updatedData.id },
        data: { username: "newusername", name: "New Name" },
      });
    });

    it("should throw an error if the user does not exist", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        userService.updateUser({ id: "non-existing-id" })
      ).rejects.toThrow("Usuário não encontrado");
    });

    it("should return existing user if no fields are updated", async () => {
      const existingUser = {
        id: "1",
        username: "oldusername",
        name: "Old Name",
        birthday: "1990-01-01",
      };

      prisma.user.findUnique.mockResolvedValue(existingUser);

      const result = await userService.updateUser(existingUser);

      expect(result).toEqual(existingUser);
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });
});
