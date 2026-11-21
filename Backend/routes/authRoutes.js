
import express from "express";

import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/me", isAuthenticated, getMe);

// Logout
router.post("/logout", logout);

export default router;
