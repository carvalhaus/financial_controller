const express = require("express");
const {
  validateCreateCategory,
  validateGetCategories,
  validateGetCategory,
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

module.exports = router;
