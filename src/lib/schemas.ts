import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
});

// Property Schemas
export const propertySchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters"),
  type: z.enum([
    "apartment",
    "house",
    "villa",
    "plot",
    "commercial",
  ]),
  price: z
    .number()
    .positive("Price must be positive"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  sqft: z
    .number()
    .positive("Square footage must be positive"),
  beds: z
    .number()
    .min(0, "Bedrooms cannot be negative"),
  baths: z
    .number()
    .min(0, "Bathrooms cannot be negative"),
  images: z.array(z.string().url()).optional(),
});

// Contact Form Schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
