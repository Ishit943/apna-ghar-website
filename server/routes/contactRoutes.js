import express from "express";
import {
  submitContactForm,
  getContacts,
  updateContactStatus,
} from "../controllers/contactController.js";
import { authMiddleware, authorize } from "../utils/auth.js";

const router = express.Router();

// Contact form submit route (public)
router.post("/", submitContactForm);

// Get all contacts (admin/team only)
router.get("/admin", authMiddleware, authorize("admin", "team_member"), getContacts);

// Update contact status (admin/team only)
router.put("/admin/:id", authMiddleware, authorize("admin", "team_member"), updateContactStatus);

export default router;
