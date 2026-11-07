import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Campaign from './models/Campaign.js';
import bcrypt from 'bcryptjs';
dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);
let user = await User.findOne({ email: 'demo@fundchain.app' });
if (!user) user = await User.create({ name: 'FundChain Demo', email: 'demo@fundchain.app', password: await bcrypt.hash('DemoPass123!', 12) });
if (await Campaign.countDocuments() === 0) {
  await Campaign.insertMany([
    { title: 'Solar Kits for Rural Learning Hubs', category: 'Environment', description: 'Help community learning hubs access reliable solar power for evening classes, digital lessons and shared study spaces.', goal: 18000, raised: 11250, creator: user._id, image: 'solar' },
    { title: 'Open Source Health Records Toolkit', category: 'Technology', description: 'Fund an accessible open-source toolkit that helps small clinics organize records and improve continuity of care.', goal: 25000, raised: 16750, creator: user._id, image: 'health' },
    { title: 'Creative Futures Scholarship Fund', category: 'Education', description: 'Support practical design and technology scholarships for talented students with limited access to training.', goal: 12000, raised: 8400, creator: user._id, image: 'education' }
  ]);
}
console.log('Seed complete. Demo login: demo@fundchain.app / DemoPass123!');
await mongoose.disconnect();
