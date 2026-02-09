"use strict";

// Securing the material

// 1. What is the best constructor in JavaScript, and how to create it?
// This is a special function that is used as a template for creating many objects of the same type using the new operator.
// 2. What is the difference between classes and constructors in JavaScript?
// Classes (from ES6) are "syntactic sugar" (a more convenient and modern syntax) over constructors and prototypes.
// Keywords:
// - Syntax: Classes use the keywords class, constructor, extends, and super. They look cleaner and more understandable.
// - "Hoisting": Class declarations are not "hoisted" like function declarations.
// - All class methods: Are non-enumerable by default (enumerable: false).
// - Strict mode: The class body is always executed in strict mode (use strict).
// 3. How to create an object using an additional object literal?
// The simplest and most common way. An object is described in curly braces {}.
// 4. What is an array in JavaScript, and how can I create it using an additional array literal?
// An ordered collection of data (elements) of any type, accessed by index (starting with 0).
// Array literal: Elements are listed in square brackets [], separated by commas.
// 5. What are the main operations that can be performed on arrays in JavaScript?
// - Access by index: arr[0]
// - Change element: arr[1] = 'New element'
// - Length of array: arr.length
// - Add/remove to the end: push(), pop()
// - Add/remove from the beginning: unshift(), shift()
// - Find element index: indexOf(), findIndex()
// - Conversion: map(), filter(), reduce(), forEach()
// - Merge/copy: concat(), slice(), spread operator (...)
// - Sort and reverse: sort(), reverse()
// 6. What are the main data types that are simple types in JavaScript?
// Primitive (simple) types: Number, String, Boolean, undefined, null, Symbol (ES6), BigInt (ES11).
// Difference: they are stored by value, not by reference.
// 7. What are the basic operations that can be performed on simple data types in JavaScript?
// - Arithmetic: +, -, *, /, %, **
// Comparison: ==, ===, !=, !==, >, <, >=, <=
// - Logical: &&, ||, !
// - String operations: concatenation (+), toUpperCase(), toLowerCase(), slice(), includes(), length (property)
// - Type conversion (coercion): explicit (String(num), Number(str)) and implicit ('5' + 3 = '53')


// Additional task:

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height
  }
  // Method for calculating area
  getArea() {
    return this.width * this.height
  }
  // Method for calculating perimeter
  getPerimeter() {
    return 2 * (this.width + this.height)
  }
}

// Creating an object (class instance)
const myRect = new Rectangle(10, 5);

// Outputting results
console.log(`Rectangle: width = ${myRect.width}, height = ${myRect.height}`);
console.log(`Area: ${myRect.getArea()}`); // 50
console.log(`Perimeter: ${myRect.getPerimeter()}`); // 30


// Student Independent Activity

// Task 1: Array and Mathematical Operations
const numbers = [10, 4, 2, 5]

const sum = numbers.reduce((acc, num) => acc + num, 0)
const difference = numbers.reduce((acc, num) => acc - num)
const product = numbers.reduce((acc, num) => acc * num, 1)
const quotient = numbers.reduce((acc, num) => acc / num)

console.log('Sum:', sum); // 21
console.log('Difference (sequential subtraction):', difference); // -1
console.log('Product:', product); // 400
console.log('Quantity (sequential division):', quotient); // 0.25

// Task 2: Object "Car"
const car = {
  brand: 'Tesla',
  model: 'Model 3',
  year: 2023,
  color: 'red',
  getInfo() {
    return `${this.brand} ${this.model}, ${this.year} year, color: ${this.color}`
  }
}
console.log(car.getInfo());

// Task 3: Map for dictionary
const dictionary = new Map();
dictionary.set('hello', 'moi');
dictionary.set('book', 'kirja');
dictionary.set('computer', 'tietokone');

console.log(dictionary.get('book')); // kirja
console.log(dictionary.has('apple')); // false

for (let [eng, fi] of dictionary) {
  console.log(`${eng} -> ${fi}`);
}

// Task 4: Set for unique fruits
const fruitsSet = new Set(['apple', 'banana', 'orange', 'apple']); // 'apple' will only be present once
console.log(fruitsSet); // Set(3) { 'apple', 'banana', 'orange' }

console.log(fruitsSet.has('banana')); // true
console.log(fruitsSet.has('cherry')); // false

fruitsSet.add('cherry');
fruitsSet.delete('orange');

// Task 5: Class "Book"
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getInfo() {
    return `"${this.title}" - ${this.author} (${this.year})`;
  }

  // Example of an additional method
  isOld() {
    const currentYear = new Date().getFullYear();
    return (currentYear - this.year) > 50;
  }
}

const myBook = new Book('Kobzar', 'Taras Shevchenko', 1840);
console.log(myBook.getInfo()); // "Kobzar" - Taras Shevchenko (1840)
console.log('Is this an old book?', myBook.isOld()); // true