import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT: string | number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Homepage');
});

app.post('/', (req: Request, res: Response) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Укажите name и message' });
  }
  res.send(`Привет, ${name}! Напоминание о важном мероприятии: "${message}"`);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
