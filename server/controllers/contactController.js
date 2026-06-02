import Contact from "../models/Contact.js";

export const submitContactForm = async (
  req,
  res
) => {
  try {
    console.log("📨 Contact form request received:", req.body);
    
    // Extract data
    const {
      name,
      mobileNumber,
      queryAbout,
    } = req.body;

    // Validation
    if (
      !name ||
      !mobileNumber ||
      !queryAbout
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    // Save to database
    const newContact =
      await Contact.create({
        name,
        mobileNumber,
        queryAbout,
      });

    console.log(
      "New Contact Saved:",
      newContact
    );

    res.status(201).json({
      success: true,
      message:
        "Form submitted successfully",
    });
  } catch (error) {
    console.error(
      "Contact form error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while saving form",
    });
  }
};