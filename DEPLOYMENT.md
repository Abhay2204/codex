# Deployment Guide for Vercel

## Prerequisites
- Vercel account
- MongoDB Atlas account (for production database)
- OpenRouter API key

## Step 1: Prepare Your Repository
1. Push your code to GitHub/GitLab/Bitbucket
2. Make sure `.env` files are in `.gitignore` (they already are)

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`

### Option B: Using Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

## Step 3: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add **ALL** these variables in one place:

### Variables (Vercel handles routing automatically):

| Variable Name | Value | Used By |
|--------------|-------|---------|
| `VITE_API_URL` | `https://your-project.vercel.app/api` | Frontend (build time) |
| `VITE_OPENROUTER_API_KEY` | `your_openrouter_api_key` | Frontend (build time) |
| `MONGODB_URI` | `your_mongodb_atlas_connection_string` | Backend (runtime) |
| `JWT_SECRET` | `your_secure_random_string` | Backend (runtime) |
| `PORT` | `5000` | Backend (runtime) |
| `VERCEL` | `1` | Backend (runtime) |

**How it works:**
- **Frontend variables** (`VITE_*`): Embedded into the static build during `npm run build`
- **Backend variables** (no prefix): Available to serverless functions at runtime via `process.env`
- You set them all in one place, Vercel handles the rest!

## Step 4: MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Vercel
5. Get your connection string
6. Replace `<password>` with your database user password
7. Add it as `MONGODB_URI` in Vercel

## Step 5: Deploy
1. Click "Deploy" in Vercel
2. Wait for build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Step 6: Seed Database (First Time Only)
After first deployment, call the reseed endpoint:
```bash
curl -X POST https://your-project.vercel.app/api/problems/reseed
```

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### API Not Working
- Check that `VITE_API_URL` points to your Vercel domain
- Verify MongoDB connection string is correct
- Check function logs in Vercel dashboard

### Database Connection Issues
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify connection string format
- Check database user permissions

## Local Development
```bash
npm install
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:5000

## Production URLs
- Frontend: https://your-project.vercel.app
- Backend API: https://your-project.vercel.app/api
