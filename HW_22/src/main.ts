import { capitalize, reverseString } from './modules/stringUtils.js';
import { Finance } from './modules/finance.js';
import { UserManagement } from './modules/userManagement.js';
import { generateFibonacci, generatePrimeNumbers } from './modules/sequenceUtils.js';


// 1
console.log('Task 1');
console.log(capitalize('apollo440'));
console.log(reverseString('apollo440'));


// 2
console.log('Task 2');
const loan = new Finance.LoanCalculator(10000, 12, 12);
const monthlyPayment = loan.calculateMonthlyPayment();
console.log(`Monthly loan payment: ${monthlyPayment.toFixed(2)}`);


const tax = new Finance.TaxCalculator(5000, 10);
const taxAmount = tax.calculateTax();
console.log(`Tax amount: ${taxAmount.toFixed(2)}`);

// 3
console.log('Task 3');
const admin = new UserManagement.Admin.AdminUser('Michael', 'm@gmail.com');
admin.promoteToSuperAdmin();
admin.backToAdmin();

// 4
console.log('Task 4');
const fibonacciSequence = generateFibonacci(150);
console.log('Fibonacci up to 150:', fibonacciSequence);

const primeNumbers = generatePrimeNumbers(20);
console.log('Primes up to20:', primeNumbers);