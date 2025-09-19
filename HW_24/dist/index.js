import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(express.json());
app.get('/', (_, res) => {
    res.send('Homepage');
});
app.post('/', (req, res) => {
    const { name, message } = req.body;
    res.send(`Привет, ${name}! Напоминание о важном мероприятии: "${message}"`);
});
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map