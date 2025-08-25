//1 Функция приветствия
function greetUser(name: string): void {
  console.log(`Привет, ${name}!`);
}
greetUser('Oleg');

//2. Типизация функции с объектом в качестве параметра
interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log(`Имя: ${person.name}`);
  console.log(`Возраст: ${person.age}`);
  console.log(`Город: ${person.city}`);
}

const newPersonInfo: Person = {
  name: 'Oleg',
  age: 25,
  city: 'Berlin',
};

printPersonInfo(newPersonInfo);

//3. Простая типизация для числового параметра
function squareNumber(num: number): number {
  return num * num;
}
console.log(squareNumber(10));

// 4.Типизация функции с boolean
function isEven(num: number): boolean {
  return num % 2 === 0;
}
console.log('589 четное?', isEven(589));
console.log('258 четное?', isEven(258));

// 5. Создание интерфейса для объекта
interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log(`Студент: ${student.name}`);
  console.log(`Оценка: ${student.grade}`);
}

const newStudentInfo: Student = {
  name: 'Oleg',
  grade: 1.0,
};

printStudentInfo(newStudentInfo);

//6. Функция с типом 'void'
function logMessage(message: string): void {
  console.log(message);
}

logMessage('Hello');
