import mongoose from 'mongoose';
const contributionSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  contributor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 1 },
  note: { type: String, maxlength: 180, default: '' },
  demo: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Contribution', contributionSchema);
