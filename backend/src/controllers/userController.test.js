const request = require("supertest");
const express = require("express");
const userController = require("./userController");
const userService = require("../services/userService");

const app = express();

app.use(express.json());

app.get("/api/users/:userId", userController.getUser);
app.put("/api/users/update", userController.updateUser);

jest.mock("../services/userService");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getUser - success", async () => {
    const mockUserId = "12345";
    const mockUserData = {
      id: mockUserId,
      name: "John Doe",
      email: "john@example.com",
    };

    userService.getUser.mockResolvedValue(mockUserData);

    const response = await request(app).get(`/api/users/${mockUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Dados do usuário recebidos com sucesso!"
    );
    expect(response.body.userData).toEqual(mockUserData);
  });

  test("getUser - error", async () => {
    const mockUserId = "12345";
    const errorMessage = "User not found";
    userService.getUser.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get(`/api/users/${mockUserId}`);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(errorMessage);
  });

  test("updateUser - success", async () => {
    const mockUserUpdateData = {
      id: "12345",
      name: "Jane Doe",
      email: "jane@example.com",
    };

    userService.updateUser.mockResolvedValue(mockUserUpdateData);

    const response = await request(app)
      .put("/api/users/update")
      .send(mockUserUpdateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Dados do usuário atualizados com sucesso!"
    );
    expect(response.body.userData).toEqual(mockUserUpdateData);
  });

  test("updateUser - error", async () => {
    const errorMessage = "Failed to update user";
    userService.updateUser.mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .put("/api/users/update")
      .send({ id: "12345", name: "Jane Doe" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(errorMessage);
  });
});
