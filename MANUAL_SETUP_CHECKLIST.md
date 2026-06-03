# Phase 0-2: Manual Setup Checklist

After code implementation is complete, you must perform these manual configuration steps before deployment works.

---

## 🔧 Step 1: Vercel Dashboard Configuration (5 minutes)

### 1.1 Set Output Directory
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your "apna-ghar" project
3. Navigate to **Settings → General**
4. Find **Build & Deployment** section
5. Set **Output Directory** to: `dist/client`
6. Click **Save**

✅ This tells Vercel where the built client code is located.

### 1.2 Add Environment Variables
1. Go to **Settings → Environment Variables**
2. Add the following variables for **Production, Preview, and Development**:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/apna-ghar?retryWrites=true&w=majority` |
| `JWT_SECRET` | A secure random string (min 32 chars) | Use `openssl rand -hex 32` to generate |

**How to generate JWT_SECRET securely:**
```bash
# On macOS/Linux
openssl rand -hex 32

# On Windows PowerShell
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

✅ Save each variable.

---

## 🔐 Step 2: MongoDB Setup (10 minutes)

### 2.1 Create Database Collections
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your cluster → Collections
3. Create database: `apna-ghar`
4. Create the following collections (empty is fine, they'll auto-populate):
   - `users`
   - `properties`
   - `contacts`
   - `refresh_tokens`
   - `activity_logs`

✅ All collections created.

### 2.2 Create Default Admin User

Use MongoDB Atlas → Collection → Insert Document:

```json
{
  "name": "Admin",
  "email": "admin@apna-ghar.com",
  "passwordHash": "<bcrypt_hash_here>",
  "role": "admin",
  "isActive": true,
  "phone": null,
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

**To generate bcrypt hash locally:**

Create a temporary Node.js file:
```javascript
import bcryptjs from 'bcryptjs';

const password = 'YourSecurePassword123';
const salt = await bcryptjs.genSalt(10);
const hash = await bcryptjs.hash(password, salt);
console.log('Hashed password:', hash);
```

Then:
```bash
cd apna-dream-nest-main
node -e "import('bcryptjs').then(b => b.default.hash('YourSecurePassword123', 10)).then(h => console.log(h))"
```

Or use an [online bcrypt generator](https://bcrypt-generator.com/) temporarily (then delete the history).

✅ Default admin user created with credentials:
- Email: `admin@apna-ghar.com`
- Password: Your chosen password

### 2.3 Rotate MongoDB Password (Security)

⚠️ **CRITICAL**: The password was exposed in the shared ZIP file

1. Go to MongoDB Atlas → **Database Access**
2. Find your user (e.g., `apna-ghar-user`)
3. Click **Edit** (pencil icon)
4. Click **Edit Password**
5. Generate new secure password or use a password manager
6. Copy the new password
7. Update `MONGODB_URI` in Vercel Environment Variables with the new password

✅ MongoDB password rotated and updated.

---

## 🧪 Step 3: Test Deployment (10 minutes)

### 3.1 Local Testing (Optional but Recommended)

Before deploying to Vercel, test locally:

```bash
# Start the development server
npm run dev

# In another terminal, test the health endpoint
curl http://localhost:5173/api/health

# Should respond with:
# { "status": "ok", "timestamp": "2026-01-XX..." }
```

### 3.2 Deploy to Vercel

```bash
git add PHASES_0_2_VERIFICATION.md MANUAL_SETUP_CHECKLIST.md
git commit -m "docs: Add manual setup and verification checklist"
git push
```

Vercel should automatically deploy. Check:
1. [Vercel Dashboard](https://vercel.com) → Deployments tab
2. Wait for deployment to complete (usually 2-5 minutes)
3. Visit your deployed URL

### 3.3 Test Endpoints

**Public endpoints (no auth needed):**
```bash
# Get properties
curl https://your-domain.vercel.app/api/properties

# Get health status
curl https://your-domain.vercel.app/api/health

# Submit contact form
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "message": "Test message"
  }'
```

**Authenticated endpoints:**
```bash
# Login (get JWT token)
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@apna-ghar.com",
    "password": "YourSecurePassword123"
  }'

# Response:
# {
#   "success": true,
#   "message": "Login successful",
#   "token": "eyJhbGc...",
#   "user": { "id": "...", "name": "Admin", "role": "admin" }
# }

# Use token to create property
curl -X POST https://your-domain.vercel.app/api/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "title": "Beautiful 2BHK Apartment",
    "location": "Mumbai",
    "type": "apartment",
    "price": 2800000,
    "description": "Spacious apartment in central Mumbai",
    "sqft": 900,
    "beds": 2,
    "baths": 1,
    "images": []
  }'
```

✅ All endpoints responding correctly.

---

## 📋 Pre-Launch Checklist

Before going live, verify:

- [ ] Vercel Output Directory set to `dist/client`
- [ ] MONGODB_URI environment variable configured
- [ ] JWT_SECRET environment variable configured
- [ ] MongoDB collections created (users, properties, contacts, refresh_tokens, activity_logs)
- [ ] Default admin user created
- [ ] MongoDB password rotated
- [ ] Local test successful (optional)
- [ ] Vercel deployment successful
- [ ] Health endpoint responding
- [ ] Login endpoint returning tokens
- [ ] Property creation working
- [ ] Contact form submissions working

---

## 🆘 Troubleshooting

### "Cannot find module" errors on Vercel
- ✅ FIXED: Deleted api/[[...index]].ts
- The catch-all handler was trying to import dist/server/server.js which doesn't exist on Vercel

### "MONGODB_URI is undefined"
- [ ] Go to Vercel Dashboard → Settings → Environment Variables
- [ ] Add MONGODB_URI for Production, Preview, and Development
- [ ] Redeploy project

### "JWT verification failed"
- [ ] Verify JWT_SECRET is set in Vercel Environment Variables
- [ ] Check that JWT_SECRET is the same across all environments
- [ ] Redeploy after adding JWT_SECRET

### "Connection timeout to MongoDB"
- [ ] Verify MongoDB connection string is correct
- [ ] Check MongoDB Atlas → Network Access → Allow All IPs (0.0.0.0/0)
- [ ] Verify database name is `apna-ghar`

### "Property images not displaying"
- [ ] Wait for Phase 2 completion (Cloudinary integration)
- [ ] Currently, Property.images[] accepts URLs but you need upload functionality

---

## 📞 Need Help?

Refer to these documentation files:
- [PHASES_0_2_VERIFICATION.md](PHASES_0_2_VERIFICATION.md) - Detailed implementation status
- [API_DEVELOPMENT_GUIDE.md](API_DEVELOPMENT_GUIDE.md) - API endpoint reference
- [QUICK_START.md](QUICK_START.md) - Quick setup guide
- [CHANGES_SUMMARY.md](CHANGES_SUMMARY.md) - Summary of all changes

---

**Status**: Ready for Phase 3 after manual setup is complete ✅
