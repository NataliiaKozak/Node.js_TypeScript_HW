import express from 'express';
import Publisher from '../models/Publisher.js';
import Magazine from '../models/Magazine.js';

const router = express.Router();

// Получить журналы издателя
router.get('/:id/magazines', async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    const magazines = await Magazine.find({ publisher: req.params.id }).populate('publisher', 'name location');
    
    res.json({
      publisher,
      magazines
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;