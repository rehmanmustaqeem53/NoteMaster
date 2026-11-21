
import express from "express";

import {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes below require authentication
router.use(isAuthenticated);

// Create a note
router.post("/create", createNote);

// Get all notes (with optional search and filters)
router.get("/", getAllNotes);

// Get one note
router.get("/:id", getSingleNote);

// Update a note
router.put("/:id", updateNote);

// Delete a note
router.delete("/:id", deleteNote);

export default router;
