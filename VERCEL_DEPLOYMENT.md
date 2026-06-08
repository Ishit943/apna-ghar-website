# Apna Ghar Website - Vercel Deployment Guide

## Project Overview

- **Frontend**: TanStack Start (React + TypeScript) with Vite
- **Backend**: Vercel Functions (Express-based API routes)
- **Database**: MongoDB Atlas
- **Hosting**: Vercel (Frontend + Backend)

## Architecture

```
apna-dream-nest/
├── src/                 # Frontend (React components, routes, styles)
├── api/                 # Backend (Vercel Functions - Node.js API routes)
│   ├── contact.ts      # Contact form submission handler
│   └── health.ts       # Health check endpoint
├── vercel.json         # Vercel deployment configuration
├── vite.config.ts      # Frontend build configuration
├── .env.local          # Local environment variables
└── .env.production     # Production environment variables
```

## Prerequisites

1. **Node.js** 18+ with npm or bun
2. **MongoDB Atlas** account (existing connection: atlas-33n13i-shard-0)
3. **Vercel** account (free tier is sufficient)
4. **Git** (for version control)

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Configure Environment Variables

Create/update `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
MONGODB_URI=mongodb://apnagharadmin:e8Y89WVGFCc0km2N@ac-xclviip-shard-00-00.njj7wev.mongodb.net:27017,...
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 3. Run Development Server

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend APIs: http://localhost:3000/api/\*

### 4. Test the Backend APIs

**Health Check:**

```bash
curl http://localhost:3000/api/health
```

**Contact Form:**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "mobileNumber": "+919876543210",
    "queryAbout": "Buy Property"
  }'
```

## Deploying to Vercel

### Step 1: Prepare Your Repository

Ensure all changes are committed to Git:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Create Vercel Project

**Option A: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab/Bitbucket
3. Click "New Project"
4. Import your GitHub repository
5. Framework: **Other** (Vite)
6. Build Command: `npm run build`
7. Output Directory: `dist`

**Option B: Using Vercel CLI**

```bash
npm i -g vercel
vercel login
vercel
```

### Step 3: Configure Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables, add:

| Variable          | Value                                | When       |
| ----------------- | ------------------------------------ | ---------- |
| `MONGODB_URI`     | Your MongoDB Atlas connection string | All        |
| `NODE_ENV`        | `production`                         | Production |
| `ALLOWED_ORIGINS` | `https://yourproject.vercel.app`     | All        |
| `VITE_API_URL`    | `/api`                               | Production |

**MongoDB Connection String:**

```
mongodb://apnagharadmin:e8Y89WVGFCc0km2N@ac-xclviip-shard-00-00.njj7wev.mongodb.net:27017,ac-xclviip-shard-00-01.njj7wev.mongodb.net:27017,ac-xclviip-shard-00-02.njj7wev.mongodb.net:27017/?ssl=true&replicaSet=atlas-33n13i-shard-0&authSource=admin&appName=apna-ghar-db
```

### Step 4: Deploy

```bash
vercel deploy --prod
```

Or use automatic deployments:

- Push to main branch → Automatic production deployment
- Push to other branches → Preview deployment

### Step 5: Verify Deployment

1. **Check Frontend**: `https://yourproject.vercel.app`
2. **Test Backend Health**: `https://yourproject.vercel.app/api/health`
3. **Test Contact Form**:
   ```bash
   curl -X POST https://yourproject.vercel.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test",
       "mobileNumber": "+919876543210",
       "queryAbout": "Buy Property"
     }'
   ```

## Troubleshooting

### 1. MongoDB Connection Errors

**Error**: `MONGODB_URI environment variable is not defined`

**Solution**:

- Check that `MONGODB_URI` is set in Vercel Environment Variables
- Verify IP whitelist in MongoDB Atlas (allow Vercel IPs: 0.0.0.0/0 or specific Vercel ranges)

### 2. CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:

- Ensure `ALLOWED_ORIGINS` includes your Vercel domain
- Update in Vercel → Environment Variables

### 3. API Route Not Found (404)

**Error**: `/api/contact returns 404`

**Solution**:

- Verify files exist in `/api` directory
- Check file names match exactly: `contact.ts`, `health.ts`
- Ensure TypeScript is compiled (should be automatic)

### 4. Build Failures

**Common causes**:

- TypeScript errors in `/api` folder
- Missing dependencies (run `npm install` before deploy)
- Check Build Logs in Vercel Dashboard

## File Structure Reference

### Frontend Files to Know

- `src/routes/index.tsx` - Homepage with contact form
- `src/routes/properties.tsx` - Properties showcase and listing form (merged)
- `src/lib/api/client.ts` - API helper functions
- `src/lib/config.server.ts` - Server-side configuration

### Backend Files to Know

- `api/contact.ts` - Contact form handler
- `api/health.ts` - Health check endpoint

### Configuration Files

- `vercel.json` - Vercel deployment settings
- `.env.local` - Local development env vars
- `.env.production` - Production env vars (for reference)
- `vite.config.ts` - Frontend build config

## Database Management

### View Data in MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Login with your account
3. Select cluster: `atlas-33n13i-shard-0`
4. Go to Collections → `apna-ghar-db` → `contacts`
5. View all submitted forms

## Next Steps

### 1. Add More API Routes

Create new files in `/api` directory:

```typescript
// api/properties.ts
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    // Handle GET request
    return res.status(200).json({ properties: [] });
  }
  res.status(405).json({ error: "Method not allowed" });
};
```

### 2. Custom Domain

1. In Vercel Dashboard → Domains
2. Add your custom domain (e.g., apnaghar.com)
3. Update DNS records as provided by Vercel

### 3. SSL Certificate

- Automatically provided by Vercel (free Let's Encrypt)

### 4. Monitoring

- Vercel Analytics (free)
- Set up error tracking
- Monitor API performance

## Performance Tips

1. **Image Optimization**: Use Vercel Image Optimization API
2. **Caching**: API routes set to `no-cache`, static assets cached for 1 hour
3. **Database Connection**: Reuse connections in Vercel Functions
4. **Bundle Size**: Monitor with `vercel analytics`

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [TanStack Start Guide](https://tanstack.com/start/latest)
- [Vercel CLI Docs](https://vercel.com/cli)

## Common Commands

```bash
# Local development
npm run dev

# Build locally
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel deploy --prod

# View Vercel logs
vercel logs

# Pull environment variables from Vercel
vercel env pull

# Check project status
vercel status
```

## Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] MongoDB IP whitelist includes Vercel (or all)
- [ ] CORS origins include your domain
- [ ] API endpoints tested in production
- [ ] Contact form submissions working
- [ ] Database backups configured
- [ ] Error monitoring set up
- [ ] Analytics enabled

---

**Last Updated**: May 30, 2026
**Maintainer**: Apna Ghar Development Team
