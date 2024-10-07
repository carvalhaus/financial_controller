const express = require("express");
const { validateCreateCategory } = require("../middleware/categoryMiddleware");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.post(
  "/api/categories/create",
  validateCreateCategory,
  categoryController.createCategory
);

module.exports = router;
