import axios from 'axios';

async function addBook() {
  try {
    const response = await axios.post('http://localhost:3000/books', {
      title: 'Гарри Поттер и тайная комната',
      author: 'Дж. Роулинг',
      year: 1997,
    });
    console.log('Книга добавлена:', response.data);
  } catch (error) {
    console.error('Ошибка при добавлении книги:', error);
    // console.error('Полная ошибка:', error);
    // console.error('HTTP Status:', error.response?.status);
    // console.error('Response Data:', error.response?.data);
    // console.error('Message:', error.message);
  }
}

// 2. Функция для получения всех книг (GET)
async function getBooks() {
  try {
    const response = await axios.get('http://localhost:3000/books');
    console.log('Список книг:', response.data);
  } catch (error) {
    console.error('Ошибка при получении книг:', error);
    // console.error('Полная ошибка:', error);
    // console.error('HTTP Status:', error.response?.status);
    // console.error('Response Data:', error.response?.data);
    // console.error('Message:', error.message);
  }
}

// 3. Функция для обновления книги (PUT)
async function updateBook() {
  try {
    const response = await axios.put('http://localhost:3000/books/2', {
      // Обратите внимание на ID (2)
      title: 'Гарри Поттер и дары смерти',
      year: 2001,
    });
    console.log('Книга обновлена:', response.data);
  } catch (error) {
    console.error('Ошибка при обновлении книги:', error);
    // console.error('Полная ошибка:', error);
    // console.error('HTTP Status:', error.response?.status);
    // console.error('Response Data:', error.response?.data);
    // console.error('Message:', error.message);
  }
}

// 4. Функция для удаления книги (DELETE)
async function deleteBook() {
  try {
    const response = await axios.delete('http://localhost:3000/books/1'); // Обратите внимание на ID (1)
    console.log('Книга удалена:', response.data);
  } catch (error) {
    console.error('Ошибка при удалении книги:', error);
    // console.error('Полная ошибка:', error);
    // console.error('HTTP Status:', error.response?.status);
    // console.error('Response Data:', error.response?.data);
    // console.error('Message:', error.message);
  }
}

addBook();
// getBooks(); // Тестируем получение списка
// updateBook(); // Тестируем обновление (нужно сначала создать книгу с id=1)
// deleteBook();  // Тестируем удаление (нужно сначала создать книгу с id=1)
