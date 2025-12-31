import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, default: 'javascript' },
  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit'], required: true },
  runtime: { type: String },
  memory: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);
