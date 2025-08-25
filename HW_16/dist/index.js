"use strict";
//1 Функция приветствия
function greetUser(name) {
    console.log(`Привет, ${name}!`);
}
greetUser('Oleg');
function printPersonInfo(person) {
    console.log(`Имя: ${person.name}`);
    console.log(`Возраст: ${person.age}`);
    console.log(`Город: ${person.city}`);
}
const newPersonInfo = {
    name: 'Oleg',
    age: 25,
    city: 'Berlin',
};
printPersonInfo(newPersonInfo);
//3. Простая типизация для числового параметра
function squareNumber(num) {
    return num * num;
}
console.log(squareNumber(10));
// 4.Типизация функции с boolean
function isEven(num) {
    return num % 2 === 0;
}
console.log('589 четное?', isEven(589));
console.log('258 четное?', isEven(258));
function printStudentInfo(student) {
    console.log(`Студент: ${student.name}`);
    console.log(`Оценка: ${student.grade}`);
}
const newStudentInfo = {
    name: 'Oleg',
    grade: 1.0,
};
printStudentInfo(newStudentInfo);
//6. Функция с типом 'void'
function logMessage(message) {
    console.log(message);
}
logMessage('Hello');
//# sourceMappingURL=index.js.map