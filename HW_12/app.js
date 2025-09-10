import express from 'express';
import { connectToDatabase, getDb } from './db/index.js';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Home page');
});

// Создаем новый продукт
app.post('/products', async (req, res) => {
  try {
    const db = getDb();
    const { name, price, description } = req.body;

    //Простая проверка 1: есть ли имя и цена
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    //Простая проверка 2: цена это число?
    if (isNaN(price)) {
      return res.status(400).json({ error: 'Price must be a valid number' });
    }

    // Создаем продукт
    const product = {
      name,
      price: Number(price), // Простое преобразование в число
      description: description || '',
    };

    // Сохраняем в базу
    const result = await db.collection('products').insertOne(product);

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
