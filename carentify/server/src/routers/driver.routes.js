const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const driverController = require("../controllers/driver.controller");

router.get("/", isAuthenticated, driverController.findAll);

module.exports = router;
