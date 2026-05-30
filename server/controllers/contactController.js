import Contact from "../models/Contact.js";

export const submitContactForm = async (
  req,
  res
) => {
  try {
    console.log("BODY:", req.body);

    const {
      name,
      mobileNumber,
      queryAbout,
    } = req.body;

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

    res.status(200).json({
      success: true,
      message:
        "Form submitted successfully",
    });
  } catch (error) {
    console.error(
      "FULL ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while saving form",
      error: error.message,
    });
  }
};