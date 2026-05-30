import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

// Get current directory (ESM)
const __dirname = path.dirname(
  fileURLToPath(import.meta.url)
);

// Load .env from server folder
dotenv.config({
  path: path.join(__dirname, ".env"),
});

// Create express app
const app = express();

// Port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/contact", contactRoutes);

// Health route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Backend server is running successfully",
  });
});

// Connect database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});