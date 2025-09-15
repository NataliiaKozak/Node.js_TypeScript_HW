/* Задание 1. Абстрактный класс Animal
Создайте абстрактный класс `Animal` с абстрактным методом `makeSound()`.
Затем создайте классы `Dog` и `Cat`, которые наследуют `Animal` 
и реализуют метод `makeSound()` по-своему (`Dog` должен возвращать "Bark", а `Cat` — "Meow").
Создайте массив типа `Animal[]`, включающий объекты `Dog` и `Cat`, и вызовите метод `makeSound()` для каждого элемента массива.*/

abstract class Animal {
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound(): string {
    return 'Bark';
  }
}

class Cat extends Animal {
  makeSound(): string {
    return 'Meow';
  }
}

const animals: Animal[] = [new Dog(), new Cat(), new Cat(), new Dog()];
console.log('1. Abstract class Animal');
animals.forEach((animal) => console.log(animal.makeSound()));

/* Задание 2. Абстрактный класс Shape с цветом
Создайте абстрактный класс `ColoredShape`, который наследует `Shape` (из задания 4 на уроке) и добавляет абстрактное поле `color`.
Реализуйте классы `ColoredCircle` и `ColoredRectangle`, которые наследуют `ColoredShape`, задают `color` и реализуют метод `calculateArea()`.
Выведите площадь и цвет для каждого объекта.*/

abstract class Shape {
  abstract name: string;
  abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
  abstract color: string;
}

class ColoredCircle extends ColoredShape {
  // name и color public → можно выводить наружу; private → радиус скрыт, доступ только через методы
  name = 'ColorCircle';

  constructor(private radius: number, public color: string) {
    super();
  }
  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class ColoredRectangle extends ColoredShape {
  name = 'ColorRectangle';

  constructor(
    private width: number,
    private height: number,
    public color: string
  ) {
    super();
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

const circle = new ColoredCircle(6, 'red');
console.log('2. Abstract class Shape with color');

console.log(`${circle.name}: 
    - aria: ${circle.calculateArea().toFixed(2)}; 
    - color: ${circle.color}.`);

const rectangle = new ColoredRectangle(4, 6, 'orange');
console.log(`${rectangle.name}: 
    - aria: ${rectangle.calculateArea()}; 
    - color: ${rectangle.color}.`);

/* Задание 3. Абстрактный класс Appliance
Создайте абстрактный класс `Appliance` с абстрактными методами `turnOn()` и `turnOff()`.
Затем создайте классы `WashingMachine` и `Refrigerator`, которые наследуют `Appliance` 
и реализуют методы `turnOn()` и `turnOff()`, выводя соответствующие сообщения.
Создайте массив типа `Appliance[]`, добавьте в него объекты `WashingMachine` и `Refrigerator`, 
и вызовите методы `turnOn()` и `turnOff()` для каждого элемента.*/

abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log('Washing machine: ON');
  }
  turnOff(): void {
    console.log('Washing machine: OFF');
  }
}

class Refrigerator extends Appliance {
  turnOn(): void {
    console.log('Refrigerator: ON');
  }
  turnOff(): void {
    console.log('Refrigerator: OFF');
  }
}

const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()];

console.log('3. Abstract class Appliance');

appliances.forEach((a) => {
  a.turnOn();
  a.turnOff();
});

/* Задание 4. Абстрактный класс Account
Создайте абстрактный класс `Account` с абстрактными методами `deposit(amount: number)` и `withdraw(amount: number)`.
Реализуйте классы `SavingsAccount` и `CheckingAccount`, которые наследуют `Account`.
В классе `SavingsAccount` добавьте логику для начисления процентов на остаток.
В классе `CheckingAccount` реализуйте снятие средств с учетом комиссии. 
Проверьте работу методов на объектах обоих классов.*/

abstract class Account {
  constructor(protected balance: number) {} //protected → доступен наследникам
  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;

  getBalance(): number {
    return this.balance;
  }
}

// Сберегательный счёт с процентами. rate - процентная ставка
class SavingsAccount extends Account {
  constructor(balance: number, private rate: number) {
    super(balance); // передаём баланс в базовый класс
  }

  //deposit — пополнение
  deposit(amount: number): void {
    this.balance += amount;
    console.log(
      `SavingsAccount: Deposit of ${amount}. Balance: ${this.balance}`
    );
  }

  //снятие
  withdraw(amount: number): void {
    if (amount > this.balance) {
      console.log('SavingsAccount: Insufficient funds.');
    } else {
      this.balance -= amount;
      console.log(
        `SavingsAccount: Withdrawal of ${amount}. Balance: ${this.balance}`
      );
    }
  }

  //добавляет проценты
  addInterest(): void {
    const interest = (this.balance * this.rate) / 100;
    this.balance += interest;
    console.log(
      `SavingsAccount: Interest accrued ${interest}. Balance: ${this.balance}`
    );
  }
}

// Текущий счёт с комиссией. fee - комиссия за каждое снятие
class CheckingAccount extends Account {
  constructor(balance: number, private fee: number) {
    super(balance);
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(
      `CheckingAccount: Deposit of ${amount}. Balance: ${this.balance}`
    );
  }

  withdraw(amount: number): void {
    const total = amount + this.fee;
    if (total > this.balance) {
      console.log('CheckingAccount: Insufficient funds.');
    } else {
      this.balance -= total;
      console.log(
        `CheckingAccount: Withdrawal ${amount} + fee ${this.fee}. Balance: ${this.balance}`
      );
    }
  }
}

console.log('4. Abstract class Account');
const savings = new SavingsAccount(3000, 10);
savings.deposit(500);
savings.withdraw(1000);
savings.addInterest();
console.log('Savings final balance:', savings.getBalance());

const checking = new CheckingAccount(3000, 10);
checking.deposit(1000);
checking.withdraw(1200);
checking.withdraw(3100);
console.log('Checking final balance:', checking.getBalance());

/* Задание 5. Абстрактный класс Media
Создайте абстрактный класс `Media` с абстрактным методом `play()`.
Затем создайте классы `Audio` и `Video`, которые наследуют `Media` и 
реализуют метод `play()` по-своему (например, `Audio` выводит "Playing audio", 
а `Video` — "Playing video"). Создайте массив типа `Media[]`, 
включающий объекты `Audio` и `Video`, и вызовите метод `play()` 
для каждого элемента массива.*/

abstract class Media {
  abstract play(): void;
}

class Audio extends Media {
  play(): void {
    console.log('Playing audio');
  }
}

class Video extends Media {
  play(): void {
    console.log('Playing video');
  }
}

const medias: Media[] = [new Audio(), new Video()];
console.log('5. Abstract class Media ');
medias.forEach((m) => m.play());
