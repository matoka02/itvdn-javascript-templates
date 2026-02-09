"use strict";

// Operations with data types

// Example 1
const num1 = 14;
const num2 = 10;

console.log("check: ", num1 >= num2);

// Example 2
const num3 = 10;
const num4 = 10;
console.log("check: ", num3 === num4);

// Example 3
const num5 = "10";
const num6 = 10;
console.log("check: ", num5 === num6);

// Example 4
const num7 = 0;
const num8 = false;
console.log("check: ", num7 == num8);

// Example 5
const a1 = true;
const b1 = true;
console.log("check: ", a1 && b1);

// Example 6
const a2 = true;
const b2 = "Some text";
console.log("check: ", a2 && b2);

// Example 7
const a3 = true;
const b3 = 0;
console.log("check: ", a3 || b3);

// Example 8
const b4 = false;
console.log("check: ", !b4);

// implicit false meanings
// 0, "", null, false, undefined, NaN

// Custom constructors

function User(name, age, country) {
  this.name = name;
  this.age = age;
  this.country = country;
  this.setNewEdge = function (newAge) {
    this.age = newAge
  }
  this.showAge = function () {
    console.log('The new age is', this.age);
  };
}

const firstPerson = new User("Maksim", 20, "Ukraine");
const secondPerson = new User("John", 40, "Japan");

firstPerson.setNewEdge(40)
firstPerson.showAge()

console.log("firstPerson", firstPerson);
console.log("secondPerson", secondPerson);


// Classes

class User2 {
  constructor(name, age, country) {
    this.name = name;
    this.age = age;
    this.country = country;
  }
  setNewAge(newAge) {
    this.age = newAge;
    console.log('The age has changed to ', this.age);
  }
}

const firstObject = new User2('Maksim', 20, 'Ukraine');
console.log('firstObject', firstObject);
firstObject.setNewAge(25)

class User3 {
  #email;
  constructor(name, age, country, email) {
    this.name = name;
    this.age = age;
    this.country = country;
    this.#email = email;
  }

  static rights = {
    admin: true,
    user: false,
  };

  get email() {
    return this.#email;
  }

  set email(newEmail) {
    this.#email = newEmail;
  }

  setNewAge(newAge) {
    this.age = newAge;
    console.log('The age has changed to ', this.age);
  }
}

const firstObject3 = new User3('Maksim', 20, 'Ukraine', 'test@gmail.com');
console.log('The user has rights of admin', firstObject3.constructor.rights);
console.log('Can I get email', firstObject3.email);
firstObject3.email = 'other@gmail.com';
console.log('Can I get email', firstObject3.email);
firstObject3.setNewAge(40);

class User4 {
  #email;
  constructor(name, age, country, email) {
    this.name = name;
    this.age = age;
    this.country = country;
    this.#email = email;
  }

  static rights = {
    admin: true,
    user: false,
  };

  static isLegalAge(age) {
    return age >= 18;
  }

  get email() {
    return this.#email;
  }

  set email(newEmail) {
    this.#email = newEmail;
  }

  setNewAge(newAge) {
    this.age = newAge;
    console.log('The age has changed to ', this.age);
  }
}

const firstObject4 = new User4('Maksim', 20, 'Ukraine', 'test@gmail.com');
console.log("Is legal age", User4.isLegalAge(firstObject4.age));


class SubUser5 extends User4 {
  constructor(name, age, country, email, fruit) {
    super(name, age, country, email);
    this.favoriteFruits = fruit;
    this.isValidUser = false;
  }

  checkIsValidUser() {
    this.isValidUser = this.email !== '' && this.name !== '';
    if (this.isValidUser) {
      console.log('The User5 is valid');
    }
  }
}

const firstObject5 = new SubUser5('Maksim', 20, 'Ukraine', 'test@gmail.com', 'banana');
firstObject5.checkIsValidUser();


class SubUser6 extends User4 {
  constructor(name, age, country, email, fruit) {
    super(name, age, country, email);
    this.favoriteFruits = fruit;
    this.isValidUser = false;
  }

  checkIsValidUser() {
    this.isValidUser = this.email !== '' && this.name !== '';
    if (this.isValidUser) {
      console.log('The User6 is valid');
    }
    if (!this.isValidUser) {
      console.log('The User6 is not valid');
    }
  }
}

const firstObject6 = new SubUser6('', 20, 'Ukraine', 'test@gmail.com', 'banana');
firstObject6.checkIsValidUser();
console.log(firstObject6);


// Array literals

const myFirstArray = [1, 2, 3, 4, 5]
console.log('myFirstArray[0]: ', myFirstArray[0]);
console.log(typeof myFirstArray);
myFirstArray[0] = 'Some text'
console.log('myFirstArray[0]: ', myFirstArray[0]);
console.log(myFirstArray);

myFirstArray.push(true);
console.log(myFirstArray);

myFirstArray.pop();
console.log(myFirstArray);

myFirstArray.unshift({ name: 'John' });
console.log(myFirstArray);

myFirstArray.shift();
console.log(myFirstArray);


// Set and Map data structures

const set = new Set();

const ivan = { name: 'Ivon' };
const petro = { name: 'Pekka' };
const maria = { name: 'Maria' };

set.add(ivan);
set.add(petro);
set.add(maria);
set.add(petro);
set.add(maria);
set.add(petro);
// set.delete(maria);
// set.clear();

console.log(set);
console.log(set.has(ivan));

const map = new Map([['someStr', 'someValue'], [1, true]]);

map.set('1', 'str1');
map.set(2, 'num1');
map.set(true, 'bool1')
console.log(map.has('someStr'))
// map.delete('someStr');
// map.clear();
console.log(map);