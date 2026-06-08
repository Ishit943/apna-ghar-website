# Quick Setup Guide - After Deployment

## Step 1: Create MongoDB Collections

### Option A: Using MongoDB Compass (GUI)

1. Connect to your MongoDB Atlas cluster
2. Create a database called `apna-ghar`
3. Create these collections:
   - `users`
   - `properties`
   - `contacts`

### Option B: Using MongoDB CLI

```bash
db.createCollection("users")
db.createCollection("properties")
db.createCollection("contacts")

# Create indexes
db.properties.createIndex({ title: "text", location: "text", description: "text" })
db.users.createIndex({ email: 1 }, { unique: true })
```

---

## Step 2: Set Up Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add these variables:

```
MONGODB_URI = mongodb+srv://USERNAME:PASSWORD@cluster-name.mongodb.net/apna-ghar?retryWrites=true&w=majority

JWT_SECRET = your-super-secret-key-at-least-32-characters-long
```

5. Make sure **Production**, **Preview**, and **Development** are all checked
6. Click **Save**

---

## Step 3: Configure Output Directory in Vercel

1. In Vercel Dashboard, go to **Settings** → **General**
2. Scroll to **Build & Output Settings**
3. Set **Output Directory** to: `dist/client`
4. Click **Save**

---

## Step 4: Deploy

```bash
git add .
git commit -m "feat: Implement Phases 0-2 - Vercel fix, Auth, Properties"
git push origin main
```

Vercel will automatically trigger a build. Monitor it in the Vercel dashboard.

---

## Step 5: Create Default Admin User (IMPORTANT)

After first deployment, create the default admin user in MongoDB:

### Using MongoDB Compass:

1. Connect to your MongoDB cluster
2. Navigate to `apna-ghar` database → `users` collection
3. Click **Insert Document** and paste:

```json
{
  "name": "Admin",
  "email": "admin@apna-ghar.com",
  "passwordHash": "$2a$10$YOUR_BCRYPT_HASH_HERE",
  "role": "admin",
  "isActive": true,
  "phone": null,
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

### To Generate bcrypt Hash:

Use this Node.js script locally:

```javascript
import bcryptjs from "bcryptjs";

const password = "YourSecurePassword123!";
const hash = await bcryptjs.hash(password, 10);
console.log(hash);
```

Then replace `YOUR_BCRYPT_HASH_HERE` with the output.

---

## Step 6: Test Authentication

```bash
# Test login endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@apna-ghar.com",
    "password": "YourSecurePassword123!"
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "admin@apna-ghar.com",
    "role": "admin"
  }
}
```

---

## Step 7: Add Sample Properties (Optional)

```javascript
// Using MongoDB shell or Compass
db.properties.insertOne({
  title: "Luxury Apartment in Downtown",
  location: "Mumbai, India",
  type: "apartment",
  price: 2500000,
  description: "Beautiful 3 BHK apartment with modern amenities",
  sqft: 1500,
  beds: 3,
  baths: 2,
  images: ["https://picsum.photos/400/300?random=1"],
  status: "active",
  isFeatured: true,
  views: 0,
  createdBy: ObjectId("YOUR_ADMIN_USER_ID"),
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

---

## Troubleshooting

### 404 on Vercel

- Verify `vercel.json` was committed
- Check that **Output Directory** in Vercel Dashboard is `dist/client`
- Run `npm run build` locally and verify `dist/client/index.html` exists

### Login fails

- Check `MONGODB_URI` is correct and network access is enabled
- Verify the admin user exists in the `users` collection
- Check that password hash was generated correctly

### Auth cookie not being set

- Ensure requests include `credentials: "include"` in fetch
- Verify `NODE_ENV=production` in Vercel environment
- Check browser DevTools → Application → Cookies for `authToken`

### Properties API returns empty

- Verify at least one property was inserted in MongoDB
- Check that `createdBy` references a valid User ID
- Ensure `MONGODB_URI` is working

---

## Next: Frontend Integration

After backend is working, update the admin login page to use the new auth context:

```tsx
import { useAuth } from "@/contexts/auth-context";

export function AdminLogin() {
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    try {
      await login(email, password);
      // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
}
```

---

## Support Files Created

- **PHASES_0_2_IMPLEMENTATION.md** - Detailed implementation summary
- **QUICK_SETUP.md** - This file

Refer to these files for any questions or troubleshooting.

---

**Status**: ✅ Phases 0-2 Complete - Ready for Production
