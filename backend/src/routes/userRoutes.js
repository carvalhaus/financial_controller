const express = require("express");
const {
  validateGetUser,
  validateUpdateUser,
} = require("../middleware/userMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/api/users/:userId", validateGetUser, userController.getUser);

router.post("/api/users/update", validateUpdateUser, userController.updateUser);

module.exports = router;
