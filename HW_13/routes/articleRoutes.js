import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// Получить статью с тегами
router.get('/:id/tags', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('tags', 'name');
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
