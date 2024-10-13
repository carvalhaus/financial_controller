// authService.test.js
const fetch = require("./__mocks__/fetch");
const { authService, googleOAuthService } = require("./authService");
const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    category: {
      createMany: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

beforeEach(() => {
  fetch.mockClear();
});

describe("Auth Service Tests", () => {
  const prisma = new PrismaClient();
  const email = `test${Math.random().toString(36).substring(7)}@example.com`;
  const hashedPassword = "hashedpassword";
  const username = email.split("@")[0];

  const defaultCategories = [
    { name: "Habitação", amount: 0, icon: "🏠" },
    { name: "Alimentação", amount: 0, icon: "🍔" },
    { name: "Transporte", amount: 0, icon: "🚗" },
    { name: "Saúde", amount: 0, icon: "💊" },
    { name: "Educação", amount: 0, icon: "📚" },
    { name: "Lazer", amount: 0, icon: "🎉" },
    { name: "Vestuário", amount: 0, icon: "👗" },
    { name: "Poupança e Investimento", amount: 0, icon: "💰" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("User Registration", () => {
    it("should register a new user successfully and create default categories", async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null); // Email not registered
      prisma.user.findUnique.mockResolvedValueOnce(null); // Username not taken

      const userResponse = {
        birthday: null,
        createdAt: new Date(),
        email,
        id: "1314ed39-8fd6-4324-a4f8-deed5ca4170f",
        name: null,
        username,
      };

      prisma.user.create.mockResolvedValue(userResponse);

      const result = await authService.registerUser(email, hashedPassword);

      expect(result).toEqual({
        birthday: null,
        createdAt: expect.any(Date),
        email,
        id: expect.any(String),
        name: null,
        username,
      });

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email,
          password: hashedPassword,
          username,
          categories: {
            create: expect.arrayContaining(
              defaultCategories.map((category) => ({
                amount: category.amount,
                icon: category.icon,
                name: category.name,
              }))
            ),
          },
        },
      });
    });

    it("should throw an error if email is already registered", async () => {
      prisma.user.findUnique.mockResolvedValue({ email });

      await expect(
        authService.registerUser(email, hashedPassword)
      ).rejects.toThrow("E-mail já registrado!");
    });

    it("should generate a unique username if taken", async () => {
      prisma.user.findUnique
        .mockResolvedValueOnce(null) // Email not registered
        .mockResolvedValueOnce({ username }); // Username taken

      prisma.user.create.mockResolvedValue({
        birthday: null,
        createdAt: new Date(),
        email,
        id: "1314ed39-8fd6-4324-a4f8-deed5ca4170f",
        name: null,
        username,
      });

      const result = await authService.registerUser(email, hashedPassword);

      expect(result.username).toEqual(username);
    });
  });

  describe("User Login", () => {
    it("should log in an existing user successfully", async () => {
      const user = {
        birthday: null,
        createdAt: new Date(),
        email,
        id: "1314ed39-8fd6-4324-a4f8-deed5ca4170f",
        name: null,
        username,
      };

      prisma.user.findUnique.mockResolvedValue(user);

      const result = await authService.loginUser(user.email);
      expect(result).toEqual({ ...user, createdAt: expect.any(Date) });
    });

    it("should throw an error for invalid email", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.loginUser("invalid@example.com")
      ).rejects.toThrow("E-mail ou senha inválidos!");
    });
  });

  describe("Google OAuth Service Tests", () => {
    describe("Fetching Google OAuth Tokens", () => {
      it("should throw an error when fetching tokens fails", async () => {
        const code = "sample_code";

        await expect(
          googleOAuthService.getGoogleOAuthTokens({ code })
        ).rejects.toThrow("Failed to retrieve Google OAuth tokens.");
      });

      test("should throw an error if the fetch fails", async () => {
        fetch.mockRejectedValueOnce(new Error("Network Error"));

        const id_token = "mock_id_token";
        const access_token = "mock_access_token";

        await expect(
          googleOAuthService.getGoogleUser({ id_token, access_token })
        ).rejects.toThrow("Failed to retrieve Google user data.");
      });

      test("should throw an error if response is not ok", async () => {
        fetch.mockResolvedValueOnce({
          ok: false,
          json: jest.fn().mockResolvedValueOnce({}),
        });

        const id_token = "mock_id_token";
        const access_token = "mock_access_token";

        await expect(
          googleOAuthService.getGoogleUser({ id_token, access_token })
        ).rejects.toThrow("Failed to retrieve Google user data.");
      });

      it("should upsert a new Google user successfully", async () => {
        const email = "test@example.com";
        const name = "Test User";
        const username = "test";

        prisma.user.findUnique.mockResolvedValue(null); // No existing user

        const userResponse = {
          id: "1314ed39-8fd6-4324-a4f8-deed5ca4170f",
          email,
          name,
          username,
          birthday: null,
          createdAt: new Date(),
        };

        prisma.user.create.mockResolvedValue(userResponse);

        const result = await googleOAuthService.upsertGoogleUser(email, name);

        const expectedUserResponse = {
          id: "1314ed39-8fd6-4324-a4f8-deed5ca4170f",
          email,
          name,
          username,
          birthday: null,
          createdAt: expect.any(Date),
        };

        expect(result).toEqual(expectedUserResponse);

        // Verify that categories are being created but not part of the final response
        expect(prisma.user.create).toHaveBeenCalledWith({
          data: {
            email,
            name,
            username,
            categories: {
              create: defaultCategories,
            },
          },
        });
      });

      it("should return existing user if already registered", async () => {
        const email = "test@example.com";
        const name = "Existing User";
        const existingUser = {
          id: "existing-user-id",
          email,
          name,
          username: "test",
        };

        prisma.user.findUnique.mockResolvedValue(existingUser);
        prisma.user.update.mockResolvedValue(existingUser);

        const result = await googleOAuthService.upsertGoogleUser(email, name);

        expect(result).toEqual(existingUser); // Ensure it returns the existing user
      });
    });
  });
});
