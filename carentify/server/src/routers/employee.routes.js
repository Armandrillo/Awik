const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const employeeController = require("../controllers/employee.controller");

router.get("/", isAuthenticated, employeeController.findAll);
router.get("/:id", isAuthenticated, employeeController.findById);

module.exports = router;
