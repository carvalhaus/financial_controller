const express = require("express");
const validateGetUser = require("../middleware/validateGetUser");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/api/users", validateGetUser, userController.getUser);

module.exports = router;
