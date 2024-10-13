const request = require("supertest");
const express = require("express");
const categoryRoutes = require("../routes/categoryRoutes");

const app = express();
app.use(express.json());
app.use(categoryRoutes);

describe("Category Routes", () => {
  const mockGetCategories = jest.fn((req, res) =>
    res.status(200).json([{ id: 1, name: "Test Category" }])
  );
  const mockGetCategory = jest.fn((req, res) =>
    res.status(200).json({ id: req.params.id, name: "Test Category" })
  );
  const mockCreateCategory = jest.fn((req, res) =>
    res.status(201).json({ message: "Category created successfully" })
  );
  const mockUpdateCategory = jest.fn((req, res) =>
    res.status(200).json({ message: "Category updated successfully" })
  );
  const mockDeleteCategory = jest.fn((req, res) => res.status(204).send());

  beforeAll(() => {
    categoryRoutes.stack.forEach((route) => {
      if (route.route.path === "/api/categories/:userId") {
        route.route.stack[0].handle = mockGetCategories;
      }
      if (route.route.path === "/api/categories/category/:id") {
        route.route.stack[0].handle = mockGetCategory;
      }
      if (route.route.path === "/api/categories/create") {
        route.route.stack[0].handle = mockCreateCategory;
      }
      if (route.route.path === "/api/categories/update") {
        route.route.stack[0].handle = mockUpdateCategory;
      }
      if (route.route.path === "/api/categories/category/delete/:id") {
        route.route.stack[0].handle = mockDeleteCategory;
      }
    });
  });

  test("GET /api/categories/:userId - Success", async () => {
    const response = await request(app).get("/api/categories/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Test Category" }]);
  });

  test("GET /api/categories/category/:id - Success", async () => {
    const response = await request(app).get("/api/categories/category/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: "1", name: "Test Category" });
  });

  test("POST /api/categories/create - Success", async () => {
    const response = await request(app)
      .post("/api/categories/create")
      .send({ name: "New Category" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Category created successfully" });
  });

  test("PUT /api/categories/update - Success", async () => {
    const response = await request(app)
      .put("/api/categories/update")
      .send({ id: 1, name: "Updated Category" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Category updated successfully" });
  });

  test("DELETE /api/categories/category/delete/:id - Success", async () => {
    const response = await request(app).delete(
      "/api/categories/category/delete/1"
    );

    expect(response.status).toBe(204);
  });
});
