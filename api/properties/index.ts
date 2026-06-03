import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/apna-ghar";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    passwordHash: String,
    role: String,
    isActive: Boolean,
    lastLogin: Date,
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
  },
  { timestamps: true }
);

const Property =
  mongoose.models.Property ||
  mongoose.model("Property", propertySchema);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers with credentials support
  const origin = req.headers.origin;
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim());
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else if (allowedOrigins.includes("*")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Connect to MongoDB
    if (
      mongoose.connection.readyState === 0
    ) {
      await mongoose.connect(MONGODB_URI);
    }

    if (req.method === "GET") {
      // Get all properties with search, filter, pagination
      const {
        search,
        type,
        minPrice,
        maxPrice,
        location,
        page = 1,
        limit = 12,
      } = req.query;

      let filter = { status: "active" };

      if (search) {
        filter.$text = { $search: search };
      }

      if (type) {
        filter.type = type;
      }

      if (location) {
        filter.location = {
          $regex: location,
          $options: "i",
        };
      }

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice)
          filter.price.$gte = Number(minPrice);
        if (maxPrice)
          filter.price.$lte = Number(maxPrice);
      }

      const skip =
        (Number(page) - 1) * Number(limit);
      const total =
        await Property.countDocuments(filter);

      const properties = await Property.find(
        filter
      )
        .populate("createdBy", "name email")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        properties,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(
            total / Number(limit)
          ),
        },
      });
    }

    if (req.method === "POST") {
      return res.status(400).json({
        success: false,
        message:
          "Use /api/properties/create endpoint",
      });
    }
  } catch (error) {
    console.error("Properties error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
