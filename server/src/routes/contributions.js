import { Router } from 'express';
import Contribution from '../models/Contribution.js';
import Campaign from '../models/Campaign.js';
import { auth } from '../middleware/auth.js';
const router = Router();
router.post('/', auth, async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount < 1 || amount > 1000000)
      return res.status(400).json({ message: 'Enter an amount between 1 and 1,000,000.' });
    const campaign = await Campaign.findById(req.body.campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found.' });
    if (campaign.status !== 'active') return res.status(400).json({ message: 'This campaign is no longer active.' });
    const contribution = await Contribution.create({
      campaign: campaign._id, contributor: req.user.id, amount, note: req.body.note || '', demo: true
    });
    campaign.raised += amount;
    if (campaign.raised >= campaign.goal) campaign.status = 'completed';
    await campaign.save();
    res.status(201).json({ contribution, campaign });
  } catch (e) { next(e); }
});
router.get('/mine', auth, async (req, res, next) => {
  try {
    res.json(await Contribution.find({ contributor: req.user.id }).populate('campaign', 'title').sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});
export default router;
