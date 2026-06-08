# Quick Vercel Deployment Checklist

## Pre-Deployment (Local Testing)

- [ ] Run `npm install` to ensure all dependencies are installed
- [ ] Update `.env.local` with correct MONGODB_URI
- [ ] Run `npm run dev` and verify frontend loads
- [ ] Test contact form submission locally
- [ ] Check API health endpoint: http://localhost:3000/api/health
- [ ] Run `npm run build` - should complete without errors
- [ ] Verify `dist/` folder is created with build output

## Vercel Setup

- [ ] Push code to GitHub/GitLab/Bitbucket
- [ ] Go to [vercel.com](https://vercel.com) and create new project
- [ ] Select your repository
- [ ] Framework: Select "Other" (Vite)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

## Environment Variables (Vercel Dashboard)

Required for production:

```
MONGODB_URI = mongodb://apnagharadmin:e8Y89WVGFCc0km2N@ac-xclviip-shard-00-00.njj7wev.mongodb.net:27017,ac-xclviip-shard-00-01.njj7wev.mongodb.net:27017,ac-xclviip-shard-00-02.njj7wev.mongodb.net:27017/?ssl=true&replicaSet=atlas-33n13i-shard-0&authSource=admin&appName=apna-ghar-db
NODE_ENV = production
ALLOWED_ORIGINS = https://yourproject.vercel.app
VITE_API_URL = /api
```

- [ ] Add all environment variables in Vercel → Settings → Environment Variables
- [ ] Select environments: Production, Preview, Development

## MongoDB Setup

- [ ] Login to [MongoDB Atlas](https://cloud.mongodb.com)
- [ ] Select cluster: `atlas-33n13i-shard-0`
- [ ] Go to Network Access → IP Whitelist
- [ ] Ensure Vercel IPs are whitelisted (recommend: 0.0.0.0/0 for simplicity, or get specific Vercel IPs)
- [ ] Go to Databases → Verify connection string
- [ ] Test connection from MongoDB Compass or terminal

## Post-Deployment Testing

- [ ] Frontend loads at `https://yourproject.vercel.app`
- [ ] Test health endpoint: `https://yourproject.vercel.app/api/health`
- [ ] Test contact form submission
- [ ] Check Vercel Logs for any errors: `vercel logs`
- [ ] Verify data appears in MongoDB Atlas
- [ ] Test on mobile device (responsive design)

## After Successful Deployment

- [ ] Update DNS records if using custom domain
- [ ] Set up analytics and monitoring
- [ ] Configure automatic deployments on push to main
- [ ] Create backup strategy for MongoDB
- [ ] Document any custom domain configuration
- [ ] Test all forms and API endpoints one more time

## Troubleshooting

If deployment fails:

1. Check Vercel Build Logs (Deployments tab)
2. Verify all environment variables are set
3. Test locally: `npm run build && npm run preview`
4. Check MongoDB connection string format
5. Ensure Node version is 18+
6. Review [Vercel Docs](https://vercel.com/docs)

## Rollback (if needed)

In Vercel Dashboard:

1. Go to Deployments
2. Find previous working deployment
3. Click "Redeploy" button
4. Automatic rollback activated

## Performance Optimization (Optional)

- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Configure caching headers
- [ ] Minify assets (automatic with build)
- [ ] Compress images
- [ ] Test with Lighthouse

---

**Estimated Time**: 15-20 minutes
**Difficulty**: Beginner-Friendly
**Support**: Check VERCEL_DEPLOYMENT.md for detailed guide
