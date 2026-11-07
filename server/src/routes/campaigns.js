import { Router } from 'express';
import Campaign from '../models/Campaign.js';
import { auth } from '../middleware/auth.js';
const router = Router();
router.get('/', async (_req, res, next) => {
  try { res.json(await Campaign.find().populate('creator', 'name').sort({ createdAt: -1 })); } catch (e) { next(e); }
});
router.get('/user/mine', auth, async (req, res, next) => {
  try { res.json(await Campaign.find({ creator: req.user.id }).sort({ createdAt: -1 })); } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Campaign.findById(req.params.id).populate('creator', 'name');
    if (!item) return res.status(404).json({ message: 'Campaign not found.' });
    res.json(item);
  } catch (e) { next(e); }
});
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, category, description, goal, image } = req.body;
    if (!title?.trim() || !description?.trim() || !Number.isFinite(Number(goal)) || Number(goal) < 1)
      return res.status(400).json({ message: 'Enter a title, description and a valid funding goal.' });
    const item = await Campaign.create({ title, category, description, goal: Number(goal), image, creator: req.user.id });
    res.status(201).json(item);
  } catch (e) { next(e); }
});
export default router;
