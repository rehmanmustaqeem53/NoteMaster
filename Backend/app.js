
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { dbConnection } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    await dbConnection();
    next();
  } catch (error) {
    console.error("Database Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NoteMaster API is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Invalid routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

export default app;
