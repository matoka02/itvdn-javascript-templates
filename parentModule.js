import { myModule } from './index.js';
import { Animal } from './index.js';

myModule.publicMethod()

// A subclass that inherits from the parent class Animal
class Dog extends Animal {
  constructor(name, breed) {
    // Call the parent class constructor using super()
    super(name);
    this.breed = breed;
  }

  // A method that overrides the parent class's speak method
  speak() {
    console.log(`${this.name} barks`);
  }

  // New subclass method
  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

// Using classes
const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak(); // Prints "Buddy barks"
myDog.fetch(); // Prints "Buddy fetches the ball"
myDog.getAnimalName()