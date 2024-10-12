const express = require("express");
const request = require("supertest");
const {
  validateCreateCategory,
  validateGetCategories,
  validateGetCategory,
  validateUpdateCategory,
  validateDeleteCategory,
} = require("./categoryMiddleware");

const app = express();
app.use(express.json());

app.post("/categories", validateCreateCategory, (req, res) => {
  res.status(200).json({ message: "Category created successfully" });
});

app.get("/categories/:userId", validateGetCategories, (req, res) => {
  res.status(200).json({ message: "Categories fetched successfully" });
});

app.get("/category/:id", validateGetCategory, (req, res) => {
  res.status(200).json({ message: "Category fetched successfully" });
});

app.put("/category", validateUpdateCategory, (req, res) => {
  res.status(200).json({ message: "Category updated successfully" });
});

app.delete("/category/:id", validateDeleteCategory, (req, res) => {
  res.status(200).json({ message: "Category deleted successfully" });
});

describe("Category Middleware", () => {
  describe("POST /categories (Create Category)", () => {
    it("should return 201 if category creation is valid", async () => {
      const response = await request(app).post("/categories").send({
        name: "Valid Category",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        icon: "🙄",
        amount: 1600,
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Category created successfully");
    });

    it("should return 400 if category creation is invalid", async () => {
      const response = await request(app).post("/categories").send({
        name: "Cat",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        icon: "🙄",
        amount: 1600,
      });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].message).toContain(
        "O nome deve ter no mínimo 4 caracteres."
      );
    });
  });

  describe("GET /categories/:userId (Get Categories)", () => {
    it("should return 200 for valid userId", async () => {
      const response = await request(app).get(
        "/categories/123e4567-e89b-12d3-a456-426614174000"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Categories fetched successfully");
    });

    it("should return 400 for invalid userId", async () => {
      const response = await request(app).get("/categories/invalid-uuid");
      expect(response.status).toBe(400);
    });
  });

  describe("GET /category/:id (Get Category)", () => {
    it("should return 200 for valid category ID", async () => {
      const response = await request(app).get(
        "/category/123e4567-e89b-12d3-a456-426614174000"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Category fetched successfully");
    });

    it("should return 400 for invalid category ID", async () => {
      const response = await request(app).get("/category/invalid-uuid");
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /category (Update Category)", () => {
    it("should return 200 if category update is valid", async () => {
      const response = await request(app).put("/category").send({
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Updated Category",
        icon: "🙄",
        amount: 1600,
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Category updated successfully");
    });

    it("should return 400 if category update is invalid", async () => {
      const response = await request(app).put("/category").send({
        id: "invalid-uuid",
        name: "Up",
      });
      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /category/:id (Delete Category)", () => {
    it("should return 200 for valid category ID", async () => {
      const response = await request(app).delete(
        "/category/123e4567-e89b-12d3-a456-426614174000"
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Category deleted successfully");
    });

    it("should return 400 for invalid category ID", async () => {
      const response = await request(app).delete("/category/invalid-uuid");
      expect(response.status).toBe(400);
    });
  });
});
