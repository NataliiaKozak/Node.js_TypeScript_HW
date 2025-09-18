/* 4.Создайте файл `sequenceUtils.ts`, в котором определите функции:
`generateFibonacci`, которая генерирует последовательность Фибоначчи до указанного числа.
`generatePrimeNumbers`, которая генерирует простые числа до указанного числа.
В файле `main.ts` импортируйте эти функции и протестируйте их на примерах.*/

export function generateFibonacci(limit: number): number[] {
  const result = [0, 1];
  while (result[result.length - 1] + result[result.length - 2] <= limit) {
    result.push(result[result.length - 1] + result[result.length - 2]);
  }
  return result;
}

export function generatePrimeNumbers(limit: number): number[] {
  const primes: number[] = [];
  for (let num = 2; num <= limit; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(num);
  }
  return primes;
}

//Вариант 2 для generatePrimeNumbers
//   export function generatePrimeNumbers(limit: number): number[] {
//   const primes: number[] = [];
//   for (let i = 2; i <= limit; i++) {
//     if (primes.every(p => i % p !== 0)) primes.push(i);
//   }
//   return primes;
// }
