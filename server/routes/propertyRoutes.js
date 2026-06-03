import express from "express";
import Property from "../models/Property.js";
import {
  authMiddleware,
  authorize,
} from "../utils/auth.js";

const router = express.Router();

// Get all properties (public) - with search, filter, pagination
router.get("/", async (req, res) => {
  try {
    const {
      search,
      type,
      minPrice,
      maxPrice,
      location,
      page = 1,
      limit = 12,
    } = req.query;

    // Build filter
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

    // Calculate pagination
    const skip =
      (Number(page) - 1) * Number(limit);

    // Get total count
    const total = await Property.countDocuments(
      filter
    );

    // Get properties
    const properties = await Property.find(filter)
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      properties,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Get properties error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching properties",
    });
  }
});

// Get single property
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    ).populate("createdBy", "name email");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("Get property error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching property",
    });
  }
});

// Create property (auth required)
router.post(
  "/",
  authMiddleware,
  authorize("admin", "team_member"),
  async (req, res) => {
    try {
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
      } = req.body;

      // Validate input
      if (
        !title ||
        !location ||
        !type ||
        !price ||
        !description ||
        !sqft ||
        beds === undefined ||
        baths === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide all required fields",
        });
      }

      const property = new Property({
        title,
        location,
        type,
        price: Number(price),
        description,
        sqft: Number(sqft),
        beds: Number(beds),
        baths: Number(baths),
        images: images || [],
        createdBy: req.user.userId,
      });

      await property.save();
      await property.populate(
        "createdBy",
        "name email"
      );

      res.status(201).json({
        success: true,
        message: "Property created successfully",
        property,
      });
    } catch (error) {
      console.error("Create property error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating property",
      });
    }
  }
);

// Update property (auth required)
router.put(
  "/:id",
  authMiddleware,
  authorize("admin", "team_member"),
  async (req, res) => {
    try {
      const property = await Property.findById(
        req.params.id
      );

      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }

      // Update allowed fields
      const updateFields = [
        "title",
        "location",
        "type",
        "price",
        "description",
        "sqft",
        "beds",
        "baths",
        "images",
        "status",
      ];

      updateFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          property[field] = req.body[field];
        }
      });

      // Only admin can change featured status
      if (
        req.body.isFeatured !== undefined &&
        req.user.role === "admin"
      ) {
        property.isFeatured =
          req.body.isFeatured;
      }

      await property.save();
      await property.populate(
        "createdBy",
        "name email"
      );

      res.json({
        success: true,
        message: "Property updated successfully",
        property,
      });
    } catch (error) {
      console.error("Update property error:", error);
      res.status(500).json({
        success: false,
        message: "Error updating property",
      });
    }
  }
);

// Delete property (auth required)
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin", "team_member"),
  async (req, res) => {
    try {
      const property = await Property.findById(
        req.params.id
      );

      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }

      // Hard delete (only admin can do this)
      // Team members soft-delete (marked as pending)
      if (req.user.role === "admin") {
        await Property.deleteOne({ _id: req.params.id });
      } else {
        property.status = "pending";
        await property.save();
      }

      res.json({
        success: true,
        message: "Property deleted successfully",
      });
    } catch (error) {
      console.error("Delete property error:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting property",
      });
    }
  }
);

export default router;
