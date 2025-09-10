/*1. Типизация функции с несколькими параметрами. 
Напишите функцию `calculateTotal`, которая принимает три параметра: price`(число), `quantity` (число), `discount` (число, по умолчанию равен 0). 
Функция должна возвращать общую стоимость товаров с учетом скидки. Если скидка не указана, она считается равной нулю.*/

// Вариант 1. Если скидка указана не в %

function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  const total = price * quantity;
  const discountTotal = total - total * discount;
  const discountedTotal = total - total * discount;

  return discountedTotal;
}

console.log(calculateTotal(100, 5));
console.log(calculateTotal(100, 5, 0.15));

// Вариант 2. Если скидка указанав %, перевод в долю

function calculateTotal1(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  const total = price * quantity;
  const discountRate = discount / 100;
  const discountedTotal = total - total * discountRate;

  return discountedTotal;
}

console.log(calculateTotal1(100, 2));
console.log(calculateTotal1(100, 2, 10));

/*2. Использование Union типов.
Создайте переменную `id`, которая может быть либо строкой, либо числом. Напишите функцию `displayId`, которая принимает эту переменную и выводит сообщение, 
содержащее значение ID. Если `id` — строка, выведите её в верхнем регистре. Если `id` — число, умножьте его на 10 перед выводом.*/

let id: string | number;

function displayId(id: string | number): void {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(`${id * 10}`);
  }
}

id = '123';
displayId(id);
id = 123;
displayId(id);

/* 3.Объявление и типизация массивов объектов
Создайте массив объектов `orders`, где каждый объект описывает заказ и содержит следующие свойства:  `orderId` (строка), `amount` (число), `status` 
(строка, может принимать значения "pending", "shipped" или "delivered"). Напишите функцию `filterOrdersByStatus`, которая принимает 
этот массив, и строку `status`, и возвращает массив заказов, соответствующих указанному статусу*/

interface Order {
  orderId: string;
  amount: number;
  status: Status;
}

type Status = 'pending' | 'shipped' | 'delivered';

const orders: Order[] = [
  { orderId: 'ORD001', amount: 500, status: 'shipped' },
  { orderId: 'ORD002', amount: 200, status: 'delivered' },
  { orderId: 'ORD003', amount: 300, status: 'pending' },
  { orderId: 'ORD004', amount: 300, status: 'pending' },
  { orderId: 'ORD005', amount: 200, status: 'shipped' },
];

function filterOrdersByStatus(
  orders: Order[],
  status: Order['status']
): Order[] {
  return orders.filter((order) => order.status === status);
}

console.log('Pending orders:', filterOrdersByStatus(orders, 'pending'));
console.log('Shipped orders:', filterOrdersByStatus(orders, 'shipped'));
console.log('Delivered orders:', filterOrdersByStatus(orders, 'delivered'));

/*Задание 4
Работа с кортежами и объектами.
Создайте кортеж `productInfo`, который содержит: название товара (строка), его цену (число), количество на складе (число).
Напишите функцию `updateStock`, которая принимает объект `inventory` (где ключ — это название товара, а значение — количество на складе) 
и кортеж `productInfo`, обновляет количество товара в объекте `inventory` и возвращает обновленный объект.*/

type ProductInfo = [string, number, number];

function updateStock(
  inventory: Record<string, number>,
  productInfo: ProductInfo
): Record<string, number> {
  const [name, , qty] = productInfo;
  return { ...inventory, [name]: qty };
}

const inventory = { Laptop: 2, Mouse: 10 };
const productInfo: ProductInfo = ['Laptop', 1200, 5];
const updated = updateStock(inventory, productInfo);
console.log(updated);
