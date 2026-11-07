import mongoose from 'mongoose';
const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 90 },
  category: { type: String, enum: ['Technology','Community','Environment','Education','Creative'], default: 'Technology' },
  description: { type: String, required: true, maxlength: 1200 },
  goal: { type: Number, required: true, min: 1 },
  raised: { type: Number, default: 0, min: 0 },
  image: { type: String, default: '' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active','completed'], default: 'active' }
}, { timestamps: true });
export default mongoose.model('Campaign', campaignSchema);
