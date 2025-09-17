"use strict";
/*Задание 3. Обработка ошибки в параллельных промисах
Напишите функцию, которая вызывает три промиса параллельно с помощью `Promise.all`.
Один из промисов должен намеренно завершиться с ошибкой через `reject`.
Обработайте эту ошибку с использованием `try/catch` и выведите соответствующее сообщение.*/
const firstPromise = new Promise((res) => setTimeout(() => res('ok1'), 1000));
const secondPromise = new Promise((_, rej) => setTimeout(() => rej(new Error('Fail second promise')), 2000));
const thirdPromise = new Promise((res) => setTimeout(() => res('ok3'), 3000));
async function parallelWithError() {
    try {
        const results = await Promise.all([firstPromise, secondPromise, thirdPromise]);
        console.log('results:', results);
    }
    catch (err) {
        console.log('Caught error from Promise.all ->', err.message);
    }
}
parallelWithError();
// 2 Вариант
function firstPromise1() {
    return new Promise((resolve) => setTimeout(() => resolve('First promise done'), 1000));
}
function secondPromise1() {
    return new Promise((resolve) => setTimeout(() => resolve('Second promise done'), 2000));
}
function thirdPromise1() {
    return new Promise((_, reject) => setTimeout(() => reject('Third promise failed!'), 3000));
}
async function allPromisesWithError() {
    try {
        const results = await Promise.all([
            firstPromise1(),
            secondPromise1(),
            thirdPromise1(),
        ]);
        console.log('All results:', results);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}
allPromisesWithError();
//# sourceMappingURL=task3.js.map