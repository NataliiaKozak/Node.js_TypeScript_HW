/*1. Напишите стрелочную функцию `sumEvenNumbers`, которая принимает массив чисел 
и возвращает сумму всех четных чисел.*/

const sumEvenNumbers = (numbers: number[]): number => {
  return numbers.filter((n) => n % 2 === 0).reduce((sum, n) => sum + n, 0);
};

console.log(sumEvenNumbers([12, 35, 47, 8, 5, 154]));



/*2. Определите интерфейс `StringToBooleanFunction` для функции, которая принимает строку 
и возвращает `boolean` (например, проверяет, является ли строка пустой). Реализуйте такую функцию.*/

interface StringToBooleanFunction {
  (str: string): boolean;
}

const isEmpty: StringToBooleanFunction = (str) => {
  return str.length === 0;
};

console.log(isEmpty('Определите интерфейс'));
console.log(isEmpty(''));



/*3.Создайте тип `CompareStrings` для функции, принимающей две строки и 
возвращающей `boolean` (например, для проверки равенства строк). 
Напишите функцию, соответствующую этому типу. */

type CompareStrings = (str1: string, str2: string) => boolean;

const areStringsEqual: CompareStrings = (str1, str2) => {
  return str1 === str2;
};

console.log(areStringsEqual('red', 'red'));
console.log(areStringsEqual('red', 'read'));



/*4. Напишите обобщенную функцию `getLastElement`, которая принимает 
массив любого типа и возвращает последний элемент этого массива.*/

function getLastElement<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1]; 
}

const numbers2 = [5, 7, 9];
const strings = ["Node.js", "&", "TypeScript"];

console.log(getLastElement(numbers2)); 
console.log(getLastElement(strings)); 
console.log(getLastElement([]));

// Нужна ли проверка?
// function getLastElement<T>(arr: T[]): T | undefined {
//     if (arr.length === 0) {
//         return undefined;
//     }
//     return arr[arr.length - 1];
// }


/*5. Создайте обобщенную функцию `make Triple`, которая принимает 
три аргумента одного типа и возвращает массив из этих трёх элементов.*/
function makeTriple<T>(a: T, b: T, c: T): T[] {
  return [a, b, c];
}

console.log(makeTriple(1, 2, 3));             
console.log(makeTriple("x", "y", "z"));       
console.log(makeTriple(true, true, false)); 