import express from 'express';
import Publisher from '../models/Publisher.js';
import Magazine from '../models/Magazine.js';
import Tag from '../models/Tag.js';
import Article from '../models/Article.js';

const router = express.Router();

// Тестовый маршрут для создания данных
router.get('/test', async (req, res) => {
  try {
    // Создаем издателя
    const publisher = await Publisher.create({
      name: 'Music Today',
      location: 'Nashville',
    });

    // Создаем журнал
    const magazine = await Magazine.create({
      title: 'Music Monthly',
      issueNumber: 205,
      publisher: publisher._id,
    });

    // Создаем статьи
    const article1 = await Article.create({
      title: 'Эволюция хип-хоп культуры',
      content: 'Хип-хоп прошел долгий путь от уличной культуры до мейнстрима...',
    });

    const article2 = await Article.create({
      title: 'Рок-музыка 90-х годов',
      content: '90-е годы стали золотой эрой альтернативного рока...',
    });

    // Создаем теги
    const hiphopTag = await Tag.create({
      name: 'hip-hop',
      articles: [article1._id, article2._id],
    });

    const rockTag = await Tag.create({
      name: 'rock',
      articles: [article2._id],
    });

    const cultureTag = await Tag.create({
      name: 'culture',
      articles: [article1._id],
    });

    // Связываем статьи с тегами
    article1.tags.push(hiphopTag._id, cultureTag._id);
    article2.tags.push(hiphopTag._id, rockTag._id);

    await article1.save();
    await article2.save();

//  ПОЛУЧАЕМ ДАННЫЕ С POPULATE ЧТОБЫ ВИДЕТЬ НАЗВАНИЯ
    const articlesWithTags = await Article.find().populate('tags', 'name');
    const tagsWithArticles = await Tag.find().populate('articles', 'title');

     res.json({ 
      message: 'Данные созданы',
      // Связь один ко многим
      publisher_magazine: {
        publisher,
        magazine: await Magazine.findById(magazine._id).populate('publisher', 'name')
      },
      // Связь многие ко многим - с названиями
      many_to_many: {
        articles: articlesWithTags,
        tags: tagsWithArticles
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;