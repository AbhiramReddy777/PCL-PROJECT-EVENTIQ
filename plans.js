const router = require('express').Router();
const Plan = require('../models/Plan');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// GET all plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ plans });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch plans.' });
  }
});

// POST save plan
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content required' });
    const plan = await Plan.create({
      userId: req.user.id,
      title: title || 'Event Plan',
      content,
      messages: [],
      city: '',
      costTable: [],
      totalCost: ''
    });
    res.status(201).json(plan);
  } catch (err) {
    console.error('Save plan error:', err);
    res.status(500).json({ error: 'Failed to save plan.' });
  }
});

// DELETE plan
router.delete('/:id', async (req, res) => {
  try {
    const plan = await Plan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!plan) return res.status(404).json({ error: 'Plan not found.' });
    res.json({ message: 'Plan deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete plan.' });
  }
});

// GET single plan
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!plan) return res.status(404).json({ error: 'Plan not found.' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch plan.' });
  }
});

module.exports = router;