# Backend API Development Guide

## Overview

The backend uses **Vercel Functions** (serverless functions) instead of traditional Express servers. Each file in the `/api` directory automatically becomes an API endpoint.

## File Structure

```
api/
├── contact.ts       → POST /api/contact
├── health.ts        → GET /api/health
└── [future routes...]
```

## Creating New API Endpoints

### Simple GET Endpoint

Create `api/properties.ts`:

```typescript
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Your logic here
    const properties = [
      { id: 1, name: "Property 1", price: 1000000 },
      { id: 2, name: "Property 2", price: 2000000 },
    ];

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
```

**Access at**: `GET /api/properties`

### POST Endpoint with Database

Create `api/properties/create.ts`:

```typescript
import { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

// Reuse MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};

// Define schema
const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const { title, description, price, location } = req.body;

    const property = await Property.create({
      title,
      description,
      price,
      location,
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
```

**Access at**: `POST /api/properties/create`

## Current Endpoints

### 1. Health Check

```
GET /api/health
Response: {
  "success": true,
  "message": "Backend server is running successfully",
  "timestamp": "2026-05-30T10:30:00Z"
}
```

### 2. Contact Form Submission

```
POST /api/contact
Body: {
  "name": "John Doe",
  "mobileNumber": "+919876543210",
  "queryAbout": "Buy Property"
}
Response: {
  "success": true,
  "message": "Form submitted successfully",
  "data": { /* saved contact record */ }
}
```

## Best Practices

### 1. Connection Pooling

MongoDB connections are expensive. Reuse them:

```typescript
let cachedConnection: any;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = await mongoose.connect(process.env.MONGODB_URI!);
  cachedConnection = connection;
  return connection;
};
```

### 2. Error Handling

Always wrap in try-catch:

```typescript
try {
  // Your code
} catch (error) {
  console.error("Error details:", error);
  return res.status(500).json({
    success: false,
    message: "Server error",
    // Only include error details in development
    ...(process.env.NODE_ENV === "development" && { error }),
  });
}
```

### 3. Validation

Use Zod for schema validation:

```typescript
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobileNumber: z.string().regex(/^[0-9+\-\s]{7,15}$/, "Invalid phone"),
  queryAbout: z.string().min(1, "Query is required"),
});

const data = contactSchema.parse(req.body);
```

### 4. CORS Configuration

Set appropriate CORS headers:

```typescript
const allowedOrigins = [
  "https://yourdomain.vercel.app",
  "https://yourdomain.com",
  process.env.NODE_ENV === "development" ? "http://localhost:5173" : null,
].filter(Boolean);

const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.setHeader("Access-Control-Allow-Origin", origin);
}
```

### 5. Rate Limiting (Optional)

For production, consider rate limiting:

```typescript
// Simple rate limiting using Vercel KV (requires KV store)
import { kv } from "@vercel/kv";

const rateLimit = async (key: string) => {
  const count = (await kv.incr(key)) || 0;
  if (count === 1) {
    await kv.expire(key, 60); // 60 seconds window
  }
  return count;
};

// In handler:
const limit = await rateLimit(`contact:${req.ip}`);
if (limit > 10) {
  return res.status(429).json({ error: "Too many requests" });
}
```

## Testing API Endpoints

### Using curl

```bash
# Test health endpoint
curl https://yourproject.vercel.app/api/health

# Test contact form
curl -X POST https://yourproject.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "mobileNumber": "+919876543210",
    "queryAbout": "Buy Property"
  }'
```

### Using JavaScript Fetch

```typescript
// From your frontend
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test",
    mobileNumber: "+919876543210",
    queryAbout: "Buy Property",
  }),
});

const data = await response.json();
console.log(data);
```

### Using Postman

1. Create new POST request
2. URL: `https://yourproject.vercel.app/api/contact`
3. Body (JSON): See curl example above
4. Send

## Environment Variables for API

Available in API routes via `process.env`:

```typescript
const mongoUri = process.env.MONGODB_URI; // MongoDB connection
const nodeEnv = process.env.NODE_ENV; // development/production
const allowedOrigins = process.env.ALLOWED_ORIGINS; // CORS whitelist
```

## Debugging

### View API Logs

In Vercel Dashboard:

1. Go to Project
2. Click "Deployments"
3. Click latest deployment
4. Go to "Logs" tab
5. Filter by API route

### Local Testing

```bash
# Run frontend dev server
npm run dev

# In another terminal, check if API works
curl http://localhost:3000/api/health
```

## Common Issues

### 1. MongoDB Connection Timeout

**Cause**: IP not whitelisted in MongoDB Atlas

**Fix**:

- Go to MongoDB Atlas → Network Access
- Add Vercel IP or 0.0.0.0/0

### 2. CORS Errors

**Cause**: Frontend domain not in CORS whitelist

**Fix**: Add domain to `ALLOWED_ORIGINS` environment variable

### 3. Cold Starts

Vercel functions have cold starts (~1-2 seconds first request). This is normal.

**Optimization**: Pre-warm with health check endpoint

### 4. Request Timeout

Vercel functions timeout after 60 seconds (Pro plan: 300s)

**Solution**: Break large operations into smaller tasks

## Advanced Topics

### 1. Middleware Pattern

```typescript
const withAuth = (handler: VercelApiHandler) => async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const user = await verifyToken(token);
  (req as any).user = user;

  return handler(req, res);
};

export default withAuth(async (req, res) => {
  const user = (req as any).user;
  res.json({ user });
});
```

### 2. File Uploads

```typescript
import { formidable } from "formidable";

export default async (req, res) => {
  const form = formidable();
  const [fields, files] = await form.parse(req);

  const uploadedFile = files.file?.[0];
  // Handle file upload
};
```

### 3. Long-Running Tasks

Use Vercel's Background Jobs (Pro+) or Cron jobs:

```typescript
// api/cron/cleanup.ts
export default async (req, res) => {
  // This runs on schedule
  // Configure in vercel.json
};
```

In `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 0 * * *"
    }
  ]
}
```

## Resources

- [Vercel Functions Docs](https://vercel.com/docs/functions/serverless-functions)
- [Node.js Runtime](https://vercel.com/docs/functions/serverless-functions/nodejs)
- [MongoDB Driver Docs](https://www.mongodb.com/docs/drivers/node/)
- [Request/Response API](https://vercel.com/docs/functions/serverless-functions/api-reference)

---

**Tip**: Always test changes locally before deploying to production!
