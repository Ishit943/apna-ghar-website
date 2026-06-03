import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

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

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

// Helper function to set CORS headers
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
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};

// Helper function to verify JWT token
const verifyToken = (token: string) => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "your-secret-key-change-this"
    );
  } catch (error) {
    return null;
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
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
    // Connect to MongoDB
    if (
      mongoose.connection.readyState === 0
    ) {
      await mongoose.connect(MONGODB_URI);
    }

    // Verify authentication
    const token =
      req.cookies?.authToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Verify user is admin
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser || currentUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can create team members",
      });
    }

    // Extract team member data
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Hash password
    const passwordHash = await bcryptjs.hash(password, 10);

    // Create team member
    const newTeamMember = await User.create({
      name,
      email,
      passwordHash,
      role: "team_member",
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      user: {
        id: newTeamMember._id,
        name: newTeamMember.name,
        email: newTeamMember.email,
        role: newTeamMember.role,
      },
    });
  } catch (error: any) {
    console.error("Team member creation error:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error during team member creation",
    });
  }
}
