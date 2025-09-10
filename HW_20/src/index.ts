/*1. Класс `Animal` и его наследник `Dog`
Создайте класс `Animal`, который содержит свойства 
`name` (имя животного) и `species` (вид животного).
Добавьте метод `sound()`, который выводит в консоль `"The animal makes a sound"`.

Затем создайте класс-наследник `Dog`, который добавляет 
новое свойство `breed` (порода собаки) и переопределяет метод `sound()`, 
чтобы он выводил `"The dog barks"`*/

class Animal {
    constructor(public name: string, public species: string) {}

    sound(): void {
        console.log("The animal makes a sound");
    }
}

class Dog extends Animal {
    constructor(public name: string, public breed: string) {
        super(name, "dog"); 
    }

    sound(): void {
        console.log("The dog barks");
    }
}

const myAnimal = new Animal("Zosya", "Cat");
myAnimal.sound(); 

const dog = new Dog("Rex", "Labrador");
// console.log(`${dog.name} is ${dog.species}. His breed is ${dog.breed}`)
dog.sound();


/*2. Статическое свойство для учета всех книг
Создайте класс `Library`, который имеет статическое свойство `totalBooks` (общее количество книг).
При каждом добавлении книги это свойство должно увеличиваться.
В классе также должен быть метод `addBook()`, который увеличивает счетчик книг.
Создайте несколько объектов класса и проверьте, как изменяется общее количество книг.*/

class Library {
  static totalBooks: number = 0;

  addBook(): void {
    Library.totalBooks += 1;
  }
}

const lib1 = new Library();
lib1.addBook();
console.log(Library.totalBooks); 

const lib2 = new Library();
lib2.addBook();
lib2.addBook();
console.log(Library.totalBooks);



/*3. Переопределение конструктора в классе `Vehicle`
Создайте класс `Vehicle`, который содержит свойства `make` (марка) и `model` (модель).
Добавьте конструктор, который инициализирует эти свойства.

Затем создайте класс-наследник `Motorcycle`, который добавляет новое свойство `type` (тип мотоцикла) 
и переопределяет конструктор для инициализации всех трех свойств.
Убедитесь, что данные правильно инициализируются при создании объекта.*/

class Vehicle {
   constructor(public make: string, public model: string) {}
}

class Motorcycle extends Vehicle {
   constructor(public make: string, public model: string, public type: string) {
    super(make, model); 
  }
}

const moto = new Motorcycle("Yamaha", "MT-07", "Sport");
console.log(`Info about motorcycle: ${moto.make}, ${moto.model}, ${moto.type}`)