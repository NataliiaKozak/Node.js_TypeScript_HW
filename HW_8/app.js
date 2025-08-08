import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import Book from './models/book.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'application/json; charset=utf-8');
//   next();
// });

app.get('/', (_, res) => {
  res.send('Main page');
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    if (!title && !author && !year) {
      return res
        .status(400)
        .json({ error: 'Нужно указать title, author или year для обновления' });
    }

    await Book.update({ title, author, year }, { where: { id } });

    const updatedBook = await Book.findByPk(id);
    res.json(updatedBook);
  } catch (error) {
    console.error('Ошибка при обновлении книги:', error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connection has been established successfully.`);
    console.log(`Server is running on port: http://localhost:${PORT}`);
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
});
