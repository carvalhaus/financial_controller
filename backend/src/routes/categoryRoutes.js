const express = require("express");
const {
  validateCreateCategory,
  validateGetCategories,
  validateGetCategory,
  validateUpdateCategory,
} = require("../middleware/categoryMiddleware");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get(
  "/api/categories/:userId",
  validateGetCategories,
  categoryController.getCategories
);

router.get(
  "/api/categories/category/:id",
  validateGetCategory,
  categoryController.getCategory
);

router.post(
  "/api/categories/create",
  validateCreateCategory,
  categoryController.createCategory
);

router.post(
  "/api/categories/update",
  validateUpdateCategory,
  categoryController.updateCategory
);

module.exports = router;
