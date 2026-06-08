import Contact from "../models/Contact.js";
import { authMiddleware, authorize } from "../utils/auth.js";

// Submit contact form (public)
export const submitContactForm = async (req, res) => {
  try {
    console.log("📨 Contact form request received:", req.body);

    const { name, email, phone, message, propertyId } = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate phone format (10 digits, starts with 6-9)
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit Indian mobile number",
      });
    }

    // Validate message length
    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 1000 characters",
      });
    }

    // Create contact submission
    const newContact = await Contact.create({
      name,
      email,
      phone,
      message,
      propertyId: propertyId || null,
      ipAddress: req.ip,
    });

    console.log("New Contact Saved:", newContact);

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      contactId: newContact._id,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while saving form",
    });
  }
};

// Get all contacts (admin/team only)
export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Contact.countDocuments(filter);

    const contacts = await Contact.find(filter)
      .populate("propertyId", "title location price")
      .populate("respondedBy", "name email")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      contacts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
    });
  }
};

// Update contact status (admin/team only)
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "read", "responded", "archived"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    contact.status = status;
    if (status === "responded") {
      contact.respondedBy = req.user.userId;
      contact.respondedAt = new Date();
    }

    await contact.save();

    res.json({
      success: true,
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating contact",
    });
  }
};
