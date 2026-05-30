import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

// MongoDB Connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const mongodbUri = process.env.MONGODB_URI;
    
    if (!mongodbUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Contact Schema
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

// Contact Model
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
};

export default async (req: VercelRequest, res: VercelResponse) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to database
    await connectDB();

    // Extract data
    const { name, mobileNumber, queryAbout } = req.body;

    // Validation
    if (!name || !mobileNumber || !queryAbout) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Save to database
    const newContact = await Contact.create({
      name,
      mobileNumber,
      queryAbout,
    });

    console.log('New Contact Saved:', newContact);

    // Set CORS headers on response
    Object.keys(corsHeaders).forEach((key) => {
      res.setHeader(key, corsHeaders[key as keyof typeof corsHeaders]);
    });

    return res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: newContact,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Set CORS headers on error response
    Object.keys(corsHeaders).forEach((key) => {
      res.setHeader(key, corsHeaders[key as keyof typeof corsHeaders]);
    });

    return res.status(500).json({
      success: false,
      message: 'Server error while saving form',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};
