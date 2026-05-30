import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

// Import express
import express from "express";

// Import cors
import cors from "cors";

// Import dotenv
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory (ESM)
const __dirname = path.dirname(
  fileURLToPath(import.meta.url)
);

// Configure dotenv with explicit path
dotenv.config({
  path: path.join(__dirname, ".env"),
});

// Create express app
const app = express();

// Port number
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/contact", contactRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message:
      "Backend server is running successfully",
  });
});

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});