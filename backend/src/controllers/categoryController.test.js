const request = require("supertest");
const express = require("express");
const categoryController = require("./categoryController");
const categoryService = require("../services/categoryService");

const app = express();
app.use(express.json());

app.post("/categories/create", categoryController.createCategory);
app.get("/categories/:userId", categoryController.getCategories);
app.get("/categories/category/:id", categoryController.getCategory);
app.put("/categories/update", categoryController.updateCategory);
app.delete(
  "/categories/category/delete/:id",
  categoryController.deleteCategory
);

jest.mock("../services/categoryService");

describe("Category Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createCategory - success", async () => {
    const mockCategory = {
      userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
      icon: "🙄",
      name: "Moradia",
      amount: 1600,
      id: "49f40095-28c0-4600-af9a-96773fbb3e7f",
    };

    categoryService.createCategory.mockResolvedValue(mockCategory);

    const response = await request(app).post("/categories/create").send({
      userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
      icon: "🙄",
      name: "Moradia",
      amount: 1600,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Categoria criada com sucesso!");
    expect(response.body.createdCategory).toEqual(mockCategory);
  });

  test("createCategory - error", async () => {
    categoryService.createCategory.mockRejectedValue(
      new Error("Database error")
    );

    const response = await request(app).post("/categories/create").send({
      userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
      icon: "🙄",
      name: "Moradia",
      amount: 1600,
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Database error");
  });

  test("getCategories - success", async () => {
    const mockCategories = {
      userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
      icon: "🙄",
      name: "Moradia",
      amount: 1600,
      id: "49f40095-28c0-4600-af9a-96773fbb3e7f",
    };

    categoryService.getCategories.mockResolvedValue(mockCategories);

    const response = await request(app).get(
      "/categories/65d46de0-4b62-42d5-b7f2-737f8b5265a4"
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Categorias recebidas com sucesso!");
    expect(response.body.categories).toEqual(mockCategories);
  });

  test("getCategory - success", async () => {
    const mockCategory = {
      id: "49f40095-28c0-4600-af9a-96773fbb3e7f",
      name: "Moradia",
      amount: 1600,
      icon: "🙄",
      userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
      Expense: [
        {
          id: "4d888266-55ae-48fd-aa02-a8f9db5b9c34",
          name: "99 noite",
          amount: 33,
          createdAt: new Date().toISOString(),
          categoryId: "49f40095-28c0-4600-af9a-96773fbb3e7f",
          userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
        },
        {
          id: "45ac3ce0-a57a-4fd9-bb76-2f6b9ceea912",
          name: "Bike Itau",
          amount: 15,
          createdAt: new Date().toISOString(),
          categoryId: "49f40095-28c0-4600-af9a-96773fbb3e7f",
          userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
        },
      ],
    };

    categoryService.getCategory.mockResolvedValue(mockCategory); // Mock the return value

    const categoryId = "49f40095-28c0-4600-af9a-96773fbb3e7f"; // Use the correct category ID

    const response = await request(app).get(
      `/categories/category/${categoryId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Categoria recebida com sucesso!");
    expect(response.body.category).toEqual(mockCategory);
  });

  test("getCategory - error", async () => {
    const errorMessage = "Categoria não cadastrada!";
    categoryService.getCategory.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get(
      "/categories/category/65d46de0-4b62-42d5-b7f2-737f8b5265a4"
    );

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Categoria não cadastrada!");
  });

  test("updateCategory - success", async () => {
    const mockCategory = {
      userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
      icon: "🙄",
      name: "Updated Category",
      amount: 2000,
      id: "49f40095-28c0-4600-af9a-96773fbb3e7f",
    };

    categoryService.updateCategory.mockResolvedValue(mockCategory);

    const response = await request(app)
      .put("/categories/update")
      .send(mockCategory);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Categoria atualizada com sucesso!");
    expect(response.body.updatedCategory).toEqual(mockCategory);
  });

  test("updateCategory - error", async () => {
    categoryService.updateCategory.mockRejectedValue(
      new Error("Update failed")
    );

    const response = await request(app)
      .put("/categories/update")
      .send({ id: 1 });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Update failed");
  });

  test("deleteCategory - success", async () => {
    const mockCategory = {
      userId: "65d46de0-4b62-42d5-b7f2-737f8b5265a4",
      icon: "🙄",
      name: "Deleted Category",
      amount: 1600,
      id: "49f40095-28c0-4600-af9a-96773fbb3e7f",
    };

    categoryService.deleteCategory.mockResolvedValue(mockCategory);

    const response = await request(app).delete(
      "/categories/category/delete/49f40095-28c0-4600-af9a-96773fbb3e7f"
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Categoria deletada com sucesso!");
    expect(response.body.category).toEqual(mockCategory);
  });

  test("deleteCategory - error", async () => {
    categoryService.deleteCategory.mockRejectedValue(
      new Error("Delete failed")
    );

    const response = await request(app).delete(
      "/categories/category/delete/49f40095-28c0-4600-af9a-96773fbb3e7f"
    );

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Delete failed");
  });
});
