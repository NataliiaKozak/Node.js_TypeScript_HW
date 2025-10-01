// Логирование ошибок сервера

import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import moment from 'moment';
dotenv.config();

const PORT2 = process.env.PORT2 || 3004;

const server = http.createServer((_, res) => {
  try {
    throw new Error('Test error for log');

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('This is server');
  } catch (err) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const errorMessage = `[${timestamp}] ${err.stack}\n`;

    fs.appendFile('errors.log', errorMessage, (writeErr) => {
      if (writeErr) {
        console.error('Error with writing in log:', writeErr);
      }
    });

    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Internal Server Error');
  }
});

server.listen(PORT2, () => {
  console.log(`Server is running on http://localhost:${PORT2}`);
});
