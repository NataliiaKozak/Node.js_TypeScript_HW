import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/db.js';
import publisherRoutes from './routes/publisherRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import testRoutes from './routes/testRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Подключение маршрутов
app.use('/publishers', publisherRoutes);
app.use('/articles', articleRoutes);
app.use('/tags', tagRoutes);
app.use('/', testRoutes); // test маршрут будет на /test

app.get('/', (req, res) => {
  res.send('Home page');
});

app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to start server', error);
  }
});