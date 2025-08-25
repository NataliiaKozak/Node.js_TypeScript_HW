import express from 'express';
import { connectToDatabase, getDb } from './db/index.js';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Тестовый маршрут
app.get('/', (_, res) => {
  res.send('Home page');
});

// Создаем новый продукт
app.post('/products', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('products').insertOne(req.body);
    res.status(201).send({ message: 'Product created', id: result.insertedId });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//Получаем список всех продуктов
app.get('/products', async (_, res) => {
  try {
    const db = getDb();
    const products = await db.collection('products').find().toArray();
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Получаем конкретный продукт по ID
app.get('/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const product = await db
      .collection('products')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.send(product);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Обновляем информацию о продукте
app.put('/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db
      .collection('products')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

    //если ID не существует в коллекции → matchedCount = 0
    if (result.matchedCount === 0) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send({ message: 'Product updated' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Удаляем продукт
app.delete('/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db
      .collection('products')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//Запуск сервера только после подключения к БД
connectToDatabase()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    })
  )
  .catch((err) =>
    console.error(
      'Failed to start the server due to MongoDB connection issue',
      err
    )
  );
