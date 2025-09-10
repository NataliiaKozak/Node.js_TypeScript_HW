/*1. Объединение и пересечение типов
Создайте два типа: `Admin` и `User`. Тип `Admin` должен включать поля `name` (строка) и `permissions` (массив строк), 
а тип `User` должен включать поля `name` (строка) и `email` (строка).
Создайте тип `AdminUser`, который объединяет свойства обоих типов, и создайте объект этого типа.*/

type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: 'Svitlana',
  permissions: ['read', 'write'],
  email: 'sv@example.com',
};

/*2. Вложенные объекты и опциональные поля
Создайте объект `Car` с полями `make` (строка), `model` (строка), и вложенным объектом `engine`, 
который имеет поля `type` (строка) и `horsepower` (число).
Добавьте опциональное поле `year` (число) для года выпуска машины.
Напишите функцию, которая выводит информацию о машине.*/

type Car = {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number;
};

const car: Car = {
  make: 'Toyota',
  model: 'Camry',
  engine: {
    type: 'petrol',
    horsepower: 180,
  },
};

function printCarInfo(c: Car): void {
  console.log(
    `${c.make} ${c.model}, Engine: ${c.engine.type}, ${
      c.engine.horsepower
    } HP, Year: ${c.year ?? 'not specified'}`
  );
}

printCarInfo(car);

/*3. Интерфейс для функции с объектом
Создайте интерфейс для функции `calculateDiscount`, которая принимает 
объект `Product` с полями `name` (строка) и `price` (число), 
а также параметр `discount` (число). 
Функция должна возвращать новую цену продукта с учетом скидки.*/

interface Product {
  name: string;
  price: number;
}

interface CalculateDiscount {
  (product: Product, discount: number): number;
}

const calculateDiscount: CalculateDiscount = (product, discount) => {
  return product.price - product.price * (discount / 100);
};

const laptop: Product = { name: 'Laptop', price: 1500 };
const finalPrice = calculateDiscount(laptop, 10);
console.log(`Price with discount: ${finalPrice}`);

// или вместо 2 последних строк
// console.log(calculateDiscount(laptop, 10));

/*4. Массив объектов и функции
Создайте интерфейс `Employee`, который включает поля `name` (строка) и `salary` (число).
Создайте массив объектов `Employee`, затем напишите функцию, 
которая принимает этот массив и возвращает массив зарплат всех сотрудников.*/

interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { name: 'Viktoriya', salary: 4000 },
  { name: 'Michael', salary: 5500 },
  { name: 'Peter', salary: 3800 },
];

function getSalaries(emps: Employee[]): number[] {
  return emps.map((emp) => emp.salary);
}

console.log(getSalaries(employees));

/*5. Наследование интерфейсов и работа с объектами
Создайте интерфейс `Person` с полями `firstName` (строка) и `lastName` (строка).
Создайте интерфейс `Student`, который наследует `Person` и добавляет поле `grade` (число).
Создайте объект `student` этого типа и напишите функцию, 
которая выводит полное имя студента и его оценку.*/

interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  firstName: 'Michael',
  lastName: 'Edison',
  grade: 1,
};

function printStudentInfo(student: Student): void {
  console.log(
    `Student: ${student.firstName} ${student.lastName}, grade: ${student.grade}`
  );
}

printStudentInfo(student);

/*6.Интерфейс для функции с несколькими параметрами
Создайте интерфейс для функции `concatStrings`, 
которая принимает два параметра: `str1` и `str2` (оба строки) и возвращает их объединение.
Реализуйте эту функцию и протестируйте её. */

interface ConcatStrings {
  (str1: string, str2: string): string;
}

const concatStrings: ConcatStrings = (str1, str2) => {
  return str1 + str2;
};

console.log(concatStrings('Alex, ', 'hello!'));
