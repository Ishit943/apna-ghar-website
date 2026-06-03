import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "apartment",
        "house",
        "villa",
        "plot",
        "commercial",
      ],
      required: [true, "Please specify property type"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price must be positive"],
    },
    priceDisplay: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: [
        true,
        "Please provide a description",
      ],
      trim: true,
    },
    sqft: {
      type: Number,
      required: [true, "Please provide square footage"],
      min: [0, "Square footage must be positive"],
    },
    beds: {
      type: Number,
      required: [true, "Please specify bedrooms"],
      min: [0, "Bedrooms cannot be negative"],
    },
    baths: {
      type: Number,
      required: [true, "Please specify bathrooms"],
      min: [0, "Bathrooms cannot be negative"],
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["active", "sold", "pending"],
      default: "active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search
propertySchema.index({
  title: "text",
  location: "text",
  description: "text",
});
// Index for filtering
propertySchema.index({
  status: 1,
  createdAt: -1,
});
propertySchema.index({ isFeatured: 1 });
propertySchema.index({ views: -1 });

const Property = mongoose.model(
  "Property",
  propertySchema
);

export default Property;
