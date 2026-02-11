"use strict";

// Iterator pattern

// Class that represents a collection
class IterableCollection {
  constructor() {
    this.collection = [];
  }

  // Adding an item to a collection
  addItem(item) {
    this.collection.push(item);
  }

  // Returning an iterator for a collection
  getIterator() {
    return new CollectionIterator(this.collection);
  }
}

// Iterator class
class CollectionIterator {
  constructor(collection) {
    this.collection = collection;
    this.index = 0;
  }

  // Method that checks if there are more items to iterate
  hasNext() {
    return this.index < this.collection.length;
  }

  // Method that returns the next item
  next() {
    return this.collection[this.index++];
  }
}

// Usage:
const collection = new IterableCollection();
collection.addItem("Item 1");
collection.addItem("Item 2");
collection.addItem("Item 3");

const iterator = collection.getIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}

// Strategy pattern
// Class that uses the strategy
class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  // Method that sets a new strategy
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  // Method that performs an action according to the strategy
  executeStrategy() {
    return this.strategy.execute();
  }
}

// Strategy interface
class Strategy {
  execute() {
    throw new Error("The 'execute' method must be implemented");
  }
}

// Concrete Strategy #1
class ConcreteStrategy1 extends Strategy {
  execute() {
    return "Executing strategy 1";
  }
}

// Concrete Strategy #2
class ConcreteStrategy2 extends Strategy {
  execute() {
    return "Executing strategy 2";
  }
}

// Usage:
const context = new Context(new ConcreteStrategy1());
console.log(context.executeStrategy()); // Executes strategy 1

context.setStrategy(new ConcreteStrategy2());
console.log(context.executeStrategy()); // Executes strategy 2

// Mediator pattern

// Mediator class that coordinates interaction between objects
class Mediator {
  constructor() {
    this.colleague1 = null;
    this.colleague2 = null;
  }

  setColleague1(colleague) {
    this.colleague1 = colleague;
  }

  setColleague2(colleague) {
    this.colleague2 = colleague;
  }

  send(message, colleague) {
    if (colleague === this.colleague1) {
      this.colleague2.receive(message);
    } else if (colleague === this.colleague2) {
      this.colleague1.receive(message);
    }
  }
}

// Colleague #1
class Colleague1 {
  constructor(mediator) {
    this.mediator = mediator;
  }

  send(message) {
    this.mediator.send(message, this);
  }

  receive(message) {
    console.log("Colleague 1 received:", message);
  }
}

// Colleague #2
class Colleague2 {
  constructor(mediator) {
    this.mediator = mediator;
  }

  send(message) {
    this.mediator.send(message, this);
  }

  receive(message) {
    console.log("Colleague 2 received:", message);
  }
}

// Usage
const mediator = new Mediator();
const colleague1 = new Colleague1(mediator);
const colleague2 = new Colleague2(mediator);

mediator.setColleague1(colleague1);
mediator.setColleague2(colleague2);

colleague1.send("Hello from Colleague 1");
colleague2.send("Hello from Colleague 2");

// Observer pattern

// Class that displays events
class Subject {
  constructor() {
    this.observers = []; // Array of observers
  }

  // Adding an observer
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Removing an observer
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Sending a message to all observers
  notify(message) {
    this.observers.forEach((observer) => observer.update(message));
  }
}

// Class that displays an observer
class Observer {
  constructor(name) {
    this.name = name;
  }

  // Method that is called when a notification is received
  update(message) {
    console.log(`${this.name} received message: ${message}`);
  }
}

// Usage
const subject = new Subject();

const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

// Adding observers
subject.addObserver(observer1);
subject.addObserver(observer2);

// Sending a message
subject.notify("Hello from Subject!");

//Tasks, see also examples.html

// Tasks:
// Create a web application to display the temperature in different cities.
// The user has to select a city from a list, and the city's temperature will be displayed in real time.

// Mediator: Create a Mediator object that will be responsible for exchanging information between elements.
// Observer: Create an Observer object that will be an observer of temperature changes for each city.

function updateTemperature(city, temperature) {
  const display = document.getElementById("temperature-display");
  display.innerHTML = `Current temperature in ${city}: ${temperature}°C`;
}

const API_URL = "http://api.openweathermap.org";
const API_KEY = "4651e07302207b01fd81b37d91ef2c4d";

async function fetchTemperature(city) {
  try {
    const coordinatesResponse = await fetch(
      `${API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
    );
    const coordinatesData = await coordinatesResponse.json();
    const { lon, lat } = coordinatesData[0];
    const weatherResponse = await fetch(
      `${API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    const weatherData = await weatherResponse.json();
    const temperature = weatherData.main.temp;
    myMediator.publish(city, temperature);
  } catch (error) {
    console.error("Error fetching temperature data", error);
  }
}

class WeatherObserver {
  constructor(mediator, city, updateCallback) {
    this.mediator = mediator;
    this.city = city;
    this.updateCallback = updateCallback;
  }

  watch() {
    this.mediator.subscribe(this.city, this.updateCallback);
  }
}

class WeatherMediator {
  constructor() {
    this.subscribers = {};
  }

  subscribe(city, callback) {
    this.subscribers[city] = this.subscribers[city] || [];
    this.subscribers[city].push(callback);
  }

  publish(city, temperature) {
    if (this.subscribers[city]) {
      this.subscribers[city].forEach((callback) => callback(temperature));
    }
  }
}

const myMediator = new WeatherMediator();

const londonObserver = new WeatherObserver(
  myMediator,
  "london",
  updateTemperature,
);
const parisObserver = new WeatherObserver(
  myMediator,
  "paris",
  updateTemperature,
);
const tokyoObserver = new WeatherObserver(
  myMediator,
  "tokyo",
  updateTemperature,
);

londonObserver.watch();
parisObserver.watch();
tokyoObserver.watch();

const cityForm = document.getElementById("city-form");
cityForm.addEventListener("change", function (event) {
  const selectedCity = event.target.value;
  fetchTemperature(selectedCity);
});

fetchTemperature("london");
fetchTemperature("paris");
fetchTemperature("tokyo");
