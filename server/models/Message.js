import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['chat', 'code', 'system'], default: 'chat' },
  createdAt: { type: Date, default: Date.now }
});

// Index for efficient querying
messageSchema.index({ roomId: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);
