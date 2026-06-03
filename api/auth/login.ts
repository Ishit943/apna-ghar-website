import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// MongoDB URI - should be in environment variables
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/apna-ghar";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    role: { type: String, default: "team_member" },
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
    phone: String,
  },
  { timestamps: true }
);

// Get or create User model
let User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET ||
      "your-secret-key-change-this",
    { expiresIn: "24h" }
  );
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Helper function to set CORS headers with credentials support
  const setCorsHeaders = (req: VercelRequest, res: VercelResponse) => {
    const origin = req.headers.origin;
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim());
    
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    } else if (allowedOrigins.includes("*")) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
    
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  };

  // Set CORS headers
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide email and password",
      });
    }

    // Connect to MongoDB
    if (
      mongoose.connection.readyState === 0
    ) {
      await mongoose.connect(MONGODB_URI);
    }

    // Find user
    const user = await User.findOne(
      { email },
      { passwordHash: 1, role: 1, isActive: 1 }
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "User account is deactivated",
      });
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(
      password,
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    // Set httpOnly cookie
    res.setHeader("Set-Cookie", [
      `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${24 * 60 * 60}`,
    ]);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
}
