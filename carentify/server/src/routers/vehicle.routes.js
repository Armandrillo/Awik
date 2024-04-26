const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const vehicleController = require("../controllers/vehicle.controller");

router.get("/", isAuthenticated, vehicleController.findAll);
router.post("/", isAuthenticated, vehicleController.create);
router.put("/:id", isAuthenticated, vehicleController.update);

module.exports = router;
