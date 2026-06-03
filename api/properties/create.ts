import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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

// Property Schema
const propertySchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    type: String,
    price: Number,
    priceDisplay: String,
    description: String,
    sqft: Number,
    beds: Number,
    baths: Number,
    images: [String],
    status: {
      type: String,
      default: "active",
    },
    isFeatured: Boolean,
    views: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Property =
  mongoose.models.Property ||
  mongoose.model("Property", propertySchema);

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
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can create properties",
      });
    }

    // Extract property data
    const {
      title,
      location,
      type,
      price,
      description,
      sqft,
      beds,
      baths,
      images,
      isFeatured,
    } = req.body;

    // Validation
    if (!title || !location || !type || !price) {
      return res.status(400).json({
        success: false,
        message:
          "Title, location, type, and price are required",
      });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number",
      });
    }

    // Create property
    const newProperty = await Property.create({
      title,
      location,
      type,
      price,
      priceDisplay: `₹ ${price.toLocaleString("en-IN")}`,
      description: description || "",
      sqft: sqft ? Number(sqft) : null,
      beds: beds ? Number(beds) : null,
      baths: baths ? Number(baths) : null,
      images: images || [],
      isFeatured: isFeatured || false,
      status: "active",
      createdBy: user._id,
    });

    // Populate creator info
    await newProperty.populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Property creation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during property creation",
    });
  }
}
