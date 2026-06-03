import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/apna-ghar";

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: String,
  isActive: Boolean,
  phone: String,
  lastLogin: Date,
});

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

const verifyToken = (token) => {
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
  const origin = req.headers.origin;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim());
if (origin && allowedOrigins.includes(origin)) {
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
} else if (allowedOrigins.includes("*")) {
  res.setHeader("Access-Control-Allow-Origin", "*");
}
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

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
    // Get token from cookie or Authorization header
    let token =
      req.cookies?.authToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const { currentPassword, newPassword } =
      req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current and new passwords are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters",
      });
    }

    // Connect to MongoDB
    if (
      mongoose.connection.readyState === 0
    ) {
      await mongoose.connect(MONGODB_URI);
    }

    // Get user
    const user = await User.findById(
      decoded.userId
    ).select("+passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare current password
    const isMatch = await bcryptjs.compare(
      currentPassword,
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    user.passwordHash = await bcryptjs.hash(
      newPassword,
      salt
    );
    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (error) {
    console.error(
      "Change password error:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
