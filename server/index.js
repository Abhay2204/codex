import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './models/User.js';
import Problem from './models/Problem.js';
import Room from './models/Room.js';
import Submission from './models/Submission.js';
import Message from './models/Message.js';
import { phase1Problems, phase2Problems, phase3Problems, phase4Problems } from './seedProblems.js';

// Only load .env file if not on Vercel (Vercel uses dashboard env vars)
if (!process.env.VERCEL) {
  dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// AUTH ROUTES
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });
    
    const user = new User({ name, email, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, xp: user.xp, solved: user.solved, streak: user.streak, rank: user.rank } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    user.lastActive = new Date();
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, xp: user.xp, solved: user.solved, streak: user.streak, rank: user.rank, solvedProblems: user.solvedProblems, country: user.country } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// USER ROUTES
app.get('/api/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/user/stats', auth, async (req, res) => {
  try {
    const { xp, solved, problemId, streak } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (xp) user.xp += xp;
    if (solved) user.solved += solved;
    if (streak !== undefined) user.streak = streak;
    if (problemId && !user.solvedProblems.includes(problemId)) {
      user.solvedProblems.push(problemId);
    }
    user.lastActive = new Date();
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LEADERBOARD ROUTES
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find()
      .select('name xp solved country rank')
      .sort({ xp: -1 })
      .limit(100);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update ranks (called every 15 minutes)
const updateRanks = async () => {
  try {
    const users = await User.find().sort({ xp: -1 });
    for (let i = 0; i < users.length; i++) {
      users[i].rank = i + 1;
      await users[i].save();
    }
    console.log('Ranks updated at', new Date().toISOString());
  } catch (error) {
    console.error('Error updating ranks:', error);
  }
};

// Update ranks every 15 minutes
setInterval(updateRanks, 15 * 60 * 1000);
updateRanks(); // Initial update

// Seed problems if empty
const seedProblems = async () => {
  try {
    const count = await Problem.countDocuments();
    if (count === 0) {
      const allProblems = [...phase1Problems, ...phase2Problems, ...phase3Problems, ...phase4Problems];
      await Problem.insertMany(allProblems);
      console.log('Problems seeded: ' + allProblems.length + ' problems (Phase 1-4)');
      return allProblems.length;
    }
    return count;
  } catch (error) {
    console.error('Error seeding problems:', error);
    return 0;
  }
};

// PROBLEM ROUTES - Auto-seed on first request
app.get('/api/problems', async (req, res) => {
  try {
    // Auto-seed if empty
    await seedProblems();
    const problems = await Problem.find().select('-__v');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get platform stats
app.get('/api/stats', async (req, res) => {
  try {
    // Auto-seed problems if empty
    await seedProblems();
    
    const [problemCount, userCount, submissionCount] = await Promise.all([
      Problem.countDocuments(),
      User.countDocuments(),
      Submission.countDocuments()
    ]);
    
    // Get problem counts by category
    const problems = await Problem.find().select('tags');
    const categoryCounts = {
      'Arrays & Strings': 0,
      'Linked Lists': 0,
      'Trees & BST': 0,
      'Graphs': 0,
      'Hash Tables': 0,
      'Heaps': 0,
      'Dynamic Programming': 0,
      'Recursion & Backtracking': 0,
      'Sorting & Searching': 0,
      'Greedy': 0,
      'Sliding Window': 0,
      'Two Pointers': 0,
      'Stacks & Queues': 0
    };
    
    problems.forEach(p => {
      p.tags.forEach(tag => {
        if (tag.includes('Array') || tag.includes('String')) categoryCounts['Arrays & Strings']++;
        if (tag.includes('Linked List')) categoryCounts['Linked Lists']++;
        if (tag.includes('Tree') || tag.includes('BST')) categoryCounts['Trees & BST']++;
        if (tag.includes('Graph')) categoryCounts['Graphs']++;
        if (tag.includes('Hash')) categoryCounts['Hash Tables']++;
        if (tag.includes('Heap')) categoryCounts['Heaps']++;
        if (tag.includes('DP') || tag.includes('Dynamic')) categoryCounts['Dynamic Programming']++;
        if (tag.includes('Recursion') || tag.includes('Backtracking')) categoryCounts['Recursion & Backtracking']++;
        if (tag.includes('Sort') || tag.includes('Search') || tag.includes('Binary Search')) categoryCounts['Sorting & Searching']++;
        if (tag.includes('Greedy')) categoryCounts['Greedy']++;
        if (tag.includes('Sliding Window')) categoryCounts['Sliding Window']++;
        if (tag.includes('Two Pointer')) categoryCounts['Two Pointers']++;
        if (tag.includes('Stack') || tag.includes('Queue')) categoryCounts['Stacks & Queues']++;
      });
    });
    
    res.json({
      problems: problemCount,
      users: userCount,
      submissions: submissionCount,
      categories: categoryCounts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/problems/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reseed problems (for development) - deletes all and reseeds
app.post('/api/problems/reseed', async (req, res) => {
  try {
    await Problem.deleteMany({});
    const allProblems = [...phase1Problems, ...phase2Problems, ...phase3Problems, ...phase4Problems];
    await Problem.insertMany(allProblems);
    res.json({ message: 'Problems reseeded', count: allProblems.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET version for easy browser access
app.get('/api/problems/reseed', async (req, res) => {
  try {
    await Problem.deleteMany({});
    const allProblems = [...phase1Problems, ...phase2Problems, ...phase3Problems, ...phase4Problems];
    await Problem.insertMany(allProblems);
    res.json({ message: 'Problems reseeded with solutions', count: allProblems.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed problems if empty (GET endpoint for easy browser access)
app.get('/api/problems/seed', async (req, res) => {
  try {
    const count = await Problem.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Problems already exist', count });
    }
    const allProblems = [...phase1Problems, ...phase2Problems, ...phase3Problems, ...phase4Problems];
    await Problem.insertMany(allProblems);
    res.json({ message: 'Problems seeded successfully', count: allProblems.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SUBMISSION ROUTES
app.post('/api/submissions', auth, async (req, res) => {
  try {
    const { problemId, code, language, status, runtime, memory } = req.body;
    const submission = new Submission({
      userId: req.userId,
      problemId, code, language, status, runtime, memory
    });
    await submission.save();
    
    // Update problem stats
    await Problem.findByIdAndUpdate(problemId, {
      $inc: { totalSubmissions: 1, ...(status === 'Accepted' ? { acceptedSubmissions: 1 } : {}) }
    });
    
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/submissions', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROOM ROUTES
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true }).populate('host', 'name');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rooms', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { name, maxParticipants, type, language } = req.body;
    const room = new Room({
      name, host: req.userId, hostName: user.name,
      maxParticipants, type, language,
      participants: [req.userId]
    });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rooms/:id/join', auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (room.participants.length >= room.maxParticipants) {
      return res.status(400).json({ error: 'Room is full' });
    }
    if (!room.participants.includes(req.userId)) {
      room.participants.push(req.userId);
      await room.save();
      
      // Add system message
      const user = await User.findById(req.userId);
      await Message.create({
        roomId: room._id,
        userId: req.userId,
        userName: user.name,
        content: `${user.name} joined the room`,
        type: 'system'
      });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single room with details
app.get('/api/rooms/:id', auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('participants', 'name email');
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leave room
app.post('/api/rooms/:id/leave', auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    
    room.participants = room.participants.filter(p => p.toString() !== req.userId);
    
    // If host leaves, close the room or transfer ownership
    if (room.host.toString() === req.userId) {
      if (room.participants.length > 0) {
        room.host = room.participants[0];
        const newHost = await User.findById(room.participants[0]);
        room.hostName = newHost.name;
      } else {
        room.isActive = false;
      }
    }
    
    await room.save();
    
    // Add system message
    const user = await User.findById(req.userId);
    await Message.create({
      roomId: room._id,
      userId: req.userId,
      userName: user.name,
      content: `${user.name} left the room`,
      type: 'system'
    });
    
    res.json({ message: 'Left room successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update shared code
app.put('/api/rooms/:id/code', auth, async (req, res) => {
  try {
    const { code } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { sharedCode: code, lastActivity: new Date() },
      { new: true }
    );
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ sharedCode: room.sharedCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CHAT/MESSAGE ROUTES
app.get('/api/rooms/:id/messages', auth, async (req, res) => {
  try {
    const { since } = req.query;
    const query = { roomId: req.params.id };
    
    // If 'since' timestamp provided, only get newer messages (for polling)
    if (since) {
      query.createdAt = { $gt: new Date(since) };
    }
    
    const messages = await Message.find(query)
      .sort({ createdAt: 1 })
      .limit(100);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rooms/:id/messages', auth, async (req, res) => {
  try {
    const { content, type = 'chat' } = req.body;
    const user = await User.findById(req.userId);
    
    const message = await Message.create({
      roomId: req.params.id,
      userId: req.userId,
      userName: user.name,
      content,
      type
    });
    
    // Update room last activity
    await Room.findByIdAndUpdate(req.params.id, { lastActivity: new Date() });
    
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`\n🚀 Backend API: http://localhost:${PORT}`);
    console.log(`🌐 Frontend:    http://localhost:3000\n`);
  });
}

export default app;
