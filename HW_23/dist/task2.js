"use strict";
/*Задание 2. Асинхронная обработка данных из массива
Напишите функцию, которая принимает массив строк.
Каждая строка будет асинхронно обрабатываться (например, преобразовываться в верхний регистр с задержкой).
Используйте `Promise.all` для выполнения всех операций параллельно и вывода всех результатов.*/
// Функция для отдельной строки
const toUpperAsync = (str, ms = 100) => new Promise((res) => setTimeout(() => res(str.toUpperCase()), ms));
//Функция для массива
async function processArrayParallel(arr) {
    const promises = arr.map((str, i) => toUpperAsync(str, 100 + i * 50)); //100 + i * 50 — задержка в миллисекундах
    const results = await Promise.all(promises); //промисы идут одновременно, не по очереди
    console.log('results:', results); // сохраняет порядок входного массива
}
processArrayParallel(['apple', 'banana', 'cherry']);
//с try/catch, но ошибки не будет
// async function processArrayParallel2(arr: string[]): Promise<void> {
//   try {
//     const promises = arr.map((str, i) => toUpperAsync(str, 100 + i * 50));
//     const results = await Promise.all(promises);
//     console.log('results:', results);
//   } catch (error) {
//     console.error('Ошибка при обработке массива', error);
//   }
// }
//# sourceMappingURL=task2.js.map