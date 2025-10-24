const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const authMiddleware = require("../../middleware/auth.js");
const response = require("../../red/res.js");

// Public routes (no authentication required)
router.post("/login", controller.login);

// Protected routes (authentication required)
router.get("/verify", authMiddleware, controller.verifyToken);
router.post("/change-password", authMiddleware, controller.changePassword);

module.exports = router;
