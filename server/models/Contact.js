import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phone: {
      type: String,
      required: [
        true,
        "10-digit phone number is required",
      ],
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message:
          "Phone must be exactly 10 digits starting with 6-9",
      },
    },
    message: {
      type: String,
      required: [
        true,
        "Message is required",
      ],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    status: {
      type: String,
      enum: ["new", "read", "responded", "archived"],
      default: "new",
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    respondedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search
contactSchema.index({ name: "text", message: "text" });
// Index for filtering by status and date
contactSchema.index({ status: 1, createdAt: -1 });

const Contact = mongoose.model(
  "Contact",
  contactSchema
);

export default Contact;