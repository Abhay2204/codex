import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hostName: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxParticipants: { type: Number, default: 5 },
  type: { type: String, enum: ['public', 'private'], default: 'public' },
  language: { type: String, default: 'JavaScript' },
  sharedCode: { type: String, default: '// Start coding together!\n' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now }
});

export default mongoose.model('Room', roomSchema);
