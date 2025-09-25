import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const fileName = process.env.FILENAME;

fs.writeFile(
  fileName,
  'Создайте текстовый файл с именем, указанным в переменной окружения `FILENAME`, и запишите в него любой текст.',
  'utf-8',
  (error) => {
    if (error) {
      console.log('Error with writing to  file', error);
      return;
    }
    console.log('Data written to the file successfully');
    fs.readFile(fileName, 'utf-8', (error, data) => {
      if (error) {
        console.log('Error reading file', error);
        return;
      }
      console.log('File read successfully: ', data);
    });
  }
);
