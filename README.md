# CodeX Platform

A next-generation coding platform with AI-powered visualization, real-time collaboration, and MongoDB backend.

## Live Demo
🚀 [https://codex-platform-seven.vercel.app](https://codex-platform-seven.vercel.app)

**Note:** First load may take a moment to initialize serverless functions.

## Features

- 🔐 User authentication (register/login with JWT)
- 📊 Real-time leaderboard (auto-updates every 15 minutes)
- 🎯 Problem solving with AI visualization
- 📈 Progress tracking and XP system
- 👥 Collaborative coding rooms
- 🌐 Multi-language support (JavaScript, Python, Java, C++, Go)
- 💾 Persistent data with MongoDB

## Tech Stack

**Frontend:** React 19, TypeScript, Tailwind CSS, Vite
**Backend:** Node.js, Express, MongoDB, JWT
**AI:** OpenRouter API (kwaipilot/kat-coder-pro)

## Quick Start

```bash
# Install all dependencies
npm install
cd server && npm install && cd ..

# Start both frontend and backend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Environment Variables

**.env.local (frontend):**
```
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
VITE_OPENROUTER_MODEL=kwaipilot/kat-coder-pro:free
```

**server/.env (backend):**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Important Notes

⚠️ **Password Recovery:** Password recovery is not available. Please save your password securely when registering.

## API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/user` - Get current user (auth required)
- `PUT /api/user/stats` - Update user stats (auth required)
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get single problem
- `POST /api/submissions` - Create submission (auth required)
- `GET /api/submissions` - Get user submissions (auth required)
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create room (auth required)
- `POST /api/rooms/:id/join` - Join room (auth required)
