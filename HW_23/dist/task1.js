"use strict";
/*Задание 1. Обработка цепочки промисов с `async/await`
Создайте несколько функций, которые возвращают промисы с разным временем выполнения.
Напишите функцию, которая вызывает эти промисы поочерёдно, используя `await`, и обрабатывает результаты каждой операции.
Убедитесь, что цепочка промисов выполняется последовательно.*/
const task = (name, ms) => new Promise((res, rej) => setTimeout(() => {
    if (Math.random() > 0.8) {
        rej(`Error in ${name}`);
    }
    else {
        res(`${name} done (${ms}ms)`);
    }
}, ms));
async function runSequential() {
    console.log('start sequential');
    try {
        const result1 = await task('task1', 3000);
        console.log(result1);
        const result2 = await task('task2', 2000);
        console.log(result2);
        const result3 = await task('task3', 1000);
        console.log(result3);
        console.log('All tasks done');
    }
    catch (error) {
        console.error('Caught error:', error);
    }
}
runSequential();
//Вариант 2
// function task1(): Promise<string> {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve('task1'), 1000);
//   });
// }
// function task2(): Promise<string> {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve('task2'), 2000);
//   });
// }
// function task3(): Promise<string> {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve('task3'), 3000);
//   });
// }
// async function runTasks(): Promise<void> {
//   const result1 = await task1();
//   console.log(result1);
//   const result2 = await task2();
//   console.log(result2);
//   const result3 = await task3();
//   console.log(result3);
//   console.log('All tasks done');
// }
// runTasks();
//# sourceMappingURL=task1.js.map