const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const accountController = require("../controllers/account.controller");

// Public routes
router.post("/login", accountController.login);
router.post("/signup", accountController.signup);
router.post("/forgot-password", accountController.forgotpassword);
// router.get("/reset-password/:id/:token", accountController.resetPassword);

// Protected routes
router.get("/", isAuthenticated, accountController.findAll);
router.get("/:id", isAuthenticated, accountController.findById);
router.put("/:id", isAuthenticated, accountController.update);
router.delete("/:id", isAuthenticated, accountController.delete);

module.exports = router;
