import mongoose from "mongoose";

const contactSchema =
  new mongoose.Schema(
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

const Contact = mongoose.model(
  "Contact",
  contactSchema
);

export default Contact;