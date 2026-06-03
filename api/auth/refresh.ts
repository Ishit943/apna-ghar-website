import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/apna-ghar";

// RefreshToken Schema
const refreshTokenSchema =
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    token: String,
    expiresAt: Date,
    userAgent: String,
    ipAddress: String,
    createdAt: Date,
  });

const RefreshToken =
  mongoose.models.RefreshToken ||
  mongoose.model(
    "RefreshToken",
    refreshTokenSchema
  );

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
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
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
    // Get refresh token from cookie or header
    let token =
      req.cookies?.refreshToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    // Connect to MongoDB
    if (
      mongoose.connection.readyState === 0
    ) {
      await mongoose.connect(MONGODB_URI);
    }

    // Find refresh token
    const refreshTokenDoc =
      await RefreshToken.findOne({
        token,
      }).populate("userId", "-passwordHash");

    if (
      !refreshTokenDoc ||
      refreshTokenDoc.expiresAt < new Date()
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Refresh token expired or invalid",
      });
    }

    // Generate new access token
    const newAccessToken = generateToken(
      refreshTokenDoc.userId._id,
      refreshTokenDoc.userId.role
    );

    // Set new cookie
    res.setHeader("Set-Cookie", [
      `authToken=${newAccessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${24 * 60 * 60}`,
    ]);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      token: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during token refresh",
    });
  }
}
