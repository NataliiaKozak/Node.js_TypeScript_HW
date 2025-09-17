/*Задание 4. Асинхронная функция с динамическим временем выполнения
Напишите асинхронную функцию, которая принимает массив чисел.
Для каждого числа создайте промис, который будет завершаться через количество миллисекунд, равное значению числа.
Используйте `Promise.all` для ожидания завершения всех промисов и вывода результатов в консоль.*/

const delayValue = (ms: number): Promise<string> =>
  new Promise((res) => setTimeout(() => res(`Waited ${ms} ms`), ms));

async function runDelays(numbers: number[]): Promise<void> {
  const promises = numbers.map((n) => delayValue(n));
  const results = await Promise.all(promises);
  console.log('All done, results:', results);
}

runDelays([100, 300, 50]);

//Вариант: с измерением реального времени выполнения каждого промиса
const delayValue1 = (ms: number): Promise<string> =>
  new Promise((res) => {
    const start = Date.now();
    setTimeout(() => {
      const end = Date.now();
      res(`Waited ${ms} ms (real: ${end - start} ms)`);
    }, ms);
  });

async function runDelays1(numbers: number[]): Promise<void> {
  const promises = numbers.map((n) => delayValue1(n));
  const results = await Promise.all(promises);
  console.log('All done, results:', results);
}

runDelays1([100, 300, 50]);
