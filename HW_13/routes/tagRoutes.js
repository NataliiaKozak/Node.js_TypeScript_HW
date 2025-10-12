import express from 'express';
import Tag from '../models/Tag.js';

const router = express.Router();

// Получить тег со статьями
router.get('/:id/articles', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id).populate('articles', 'title');
    res.json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
