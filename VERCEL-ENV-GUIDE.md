# Vercel Environment Variables - Quick Guide

## 🎯 The Simple Answer

**You set ALL variables in ONE place in Vercel Dashboard.**

Vercel is smart enough to:
- Give `VITE_*` variables to the frontend during build
- Give other variables to the backend at runtime

## 📋 Step-by-Step Setup

### 1. Go to Vercel Dashboard
```
Your Project → Settings → Environment Variables
```

### 2. Add These Variables (one by one):

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-project.vercel.app/api` | Production |
| `VITE_OPENROUTER_API_KEY` | `sk-or-v1-...` | Production |
| `MONGODB_URI` | `mongodb+srv://...` | Production |
| `JWT_SECRET` | `your-secret-key` | Production |
| `PORT` | `5000` | Production |
| `VERCEL` | `1` | Production |

### 3. Click "Save" for each variable

### 4. Redeploy your project
```
Deployments → Latest → Redeploy
```

## 🔍 How Vercel Routes Variables

```
┌──────────────────────────────────────┐
│  Vercel Environment Variables        │
│  (You set these once)                │
└────────────┬─────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────┐      ┌──────────┐
│ VITE_*  │      │ Others   │
└────┬────┘      └─────┬────┘
     │                 │
     ▼                 ▼
  Frontend          Backend
  (Build)          (Runtime)
```

### Frontend Variables (`VITE_*`)
- **When**: Build time (during `npm run build`)
- **How**: Vite replaces `import.meta.env.VITE_*` with actual values
- **Result**: Values are embedded in your JavaScript bundle
- **Example**: `VITE_API_URL` becomes a string in your compiled code

### Backend Variables (no prefix)
- **When**: Runtime (when API is called)
- **How**: Available via `process.env.*`
- **Result**: Values are read from environment at runtime
- **Example**: `process.env.MONGODB_URI` reads the value when needed

## ✅ Verification

After deployment, check:

1. **Frontend**: Open browser console and type:
   ```javascript
   // This won't work (security), but the app will use it internally
   ```

2. **Backend**: Check function logs in Vercel Dashboard:
   ```
   Deployments → Your Deployment → Functions → View Logs
   ```

3. **Test API**: Visit:
   ```
   https://your-project.vercel.app/api/problems
   ```

## 🚨 Common Issues

### Issue: "API_URL is undefined"
**Solution**: Make sure `VITE_API_URL` is set and you redeployed after adding it

### Issue: "MongoDB connection failed"
**Solution**: 
- Check `MONGODB_URI` is correct
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access

### Issue: "Changes not reflecting"
**Solution**: Redeploy after changing environment variables

## 💡 Pro Tips

1. **Use Production environment** for all variables (not Preview/Development)
2. **Redeploy after adding variables** - they don't auto-apply
3. **Never commit .env files** - they're in .gitignore
4. **Test locally first** with `.env.local` and `server/.env`

## 🔐 Security

- `VITE_*` variables are **public** (embedded in frontend code)
- Other variables are **private** (only backend can access)
- Never put secrets in `VITE_*` variables
- `VITE_OPENROUTER_API_KEY` is okay because OpenRouter has rate limits and domain restrictions

## 📚 More Info

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
