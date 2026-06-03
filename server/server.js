import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

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
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:8081', 'http://127.0.0.1:8081', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
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

// For local development (not in serverless), start the server
if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
}

// Export app for Vercel serverless function
export default app;