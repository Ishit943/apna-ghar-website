// Import mongoose
import mongoose from "mongoose";

// Create schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    queryAbout: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const Contact = mongoose.model(
  "Contact",
  contactSchema
);

// Export model
export default Contact;