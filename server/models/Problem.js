import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  tags: [{ type: String }],
  acceptanceRate: { type: Number, default: 50 },
  description: { type: String, required: true },
  starterCode: { type: String, required: true },
  visualizationType: { type: String, default: 'Array' },
  examples: [{
    input: String,
    expected: String,
    isHidden: { type: Boolean, default: false }
  }],
  totalSubmissions: { type: Number, default: 0 },
  acceptedSubmissions: { type: Number, default: 0 }
});

export default mongoose.model('Problem', problemSchema);
