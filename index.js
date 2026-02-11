"use strict";

// Singleton pattern
console.log("=== Singleton pattern ===\n");

const Singleton = (function () {
  let instance;

  function init() {
    // Private methods and properties
    function privateMethod() {
      console.log("This is a private method.");
    }

    let privateVariable = "This is a private variable.";

    return {
      // Public methods and properties
      publicMethod: function () {
        console.log("This is a public method.");
      },
      publicVariable: "This is a public variable.",
      getPrivateVariable: function () {
        return privateVariable;
      },
    };
  }

  return {
    // method for getting an instance of a class
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

// Using
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2);

instance1.publicMethod();
console.log(instance1.publicVariable);
console.log(instance1.getPrivateVariable());

// Factory pattern
console.log("=== Factory pattern ===\n");

class Car {
  constructor(options) {
    this.doors = options.doors || 4;
    this.color = options.color || "black";
    this.brand = options.brand || "Unknown";
  }
  start() {
    console.log(`Starting the ${this.brand}`);
  }
  stop() {
    console.log(`Stopping the ${this.brand}`);
  }
}

class SUV extends Car {
  constructor(options) {
    super(options);
  }
  startEngine() {
    console.log(`Starting the engine of ${this.brand} SUV`);
  }
}

class Sedan extends Car {
  constructor(options) {
    super(options);
  }
  startButtery() {
    console.log(`Starting the buttery of ${this.brand} Sedan`);
  }
}

class CarFactory {
  createCar(options) {
    switch (options.type) {
      // case "SUV":
      //   return new Car(options);
      // case "Sedan":
      //   options.doors = 4;
      //   options.color = "blue";
      //   options.brand = "Toyota";
      //   return new Car(options);
      case "SUV":
        return new SUV(options);
      case "Sedan":
        return new Sedan(options);
      case "Truck":
        options.doors = 2;
        options.color = "white";
        options.brand = "Ford";
        return new Car(options);
      default:
        return new Car(options);
    }
  }
}

// Usage
const factory = new CarFactory();

// const suv = factory.createCar({ type: "SUV" });
// const sedan = factory.createCar({ type: "Sedan" });
// const truck = factory.createCar({ type: "Truck" });

// console.table(suv);
// console.table(sedan);
// console.table(truck);

// sedan.start();
// truck.stop();

const suv = factory.createCar({ type: "SUV", brand: "Toyota" });
const sedan = factory.createCar({ type: "Sedan", brand: "Honda" });

console.table(suv);
console.table(sedan);

suv.start();
suv.startEngine();

sedan.start();
sedan.startButtery();

// Facade pattern
console.log("=== Facade pattern ===\n");

// Subsystem
class Engine {
  start() {
    console.log("Engine started");
  }

  stop() {
    console.log("Engine stopped");
  }
}

class Lights {
  turnOn() {
    console.log("Lights turned on");
  }

  turnOff() {
    console.log("Lights turned off");
  }
}

class FuelInjector {
  inject() {
    console.log("Fuel injected");
  }
}

// Facade
class CarFacade {
  constructor() {
    this.engine = new Engine();
    this.lights = new Lights();
    this.fuelInjector = new FuelInjector();
  }

  startCar() {
    this.engine.start();
    this.lights.turnOn();
    this.fuelInjector.inject();
    console.log("Car started successfully");
  }

  stopCar() {
    this.engine.stop();
    this.lights.turnOff();
    console.log("Car stopped");
  }
}

// Usage
const car = new CarFacade();

car.startCar(); // Starting the engine
car.stopCar(); // Stop the engine

// Proxy pattern
console.log("=== Proxy pattern ===\n");

// The original object that we will create a proxy for
class RealSubject {
  request() {
    console.log("RealSubject: Processing request.");
  }
}

// Proxy for RealSubject
class ProxySubject {
  constructor(realSubject) {
    this.realSubject = realSubject;
  }

  // Method that redirects calls to RealSubject
  request() {
    if (this.checkAccess()) {
      this.realSubject.request();
    } else {
      console.log("ProxySubject: Access denied.");
    }
  }

  // Checking access to RealSubject
  checkAccess() {
    console.log("ProxySubject: Checking access...");
    return true; // In this case, access is always allowed
  }
}

// Using
const realSubject = new RealSubject();
const proxy = new ProxySubject(realSubject);

// Proxy appeal
proxy.request();

// Decorator pattern
console.log("=== Decorator pattern ===\n");

// A base class that represents the object to which functionality will be added
class Car2 {
  getPrice() {
    return 10000;
  }
}

// A specific decorator that adds the "climate-controlled car" functionality to a car
class CarWithClimateControl extends Car2 {
  constructor(car) {
    super(car);
  }

  getPrice() {
    return super.getPrice() + 2000; // Additional cost for climate control
  }
}

// Using
const basicCar = new Car2();
console.log("Basic car price:", basicCar.getPrice());

const carWithClimateControl = new CarWithClimateControl(basicCar);
console.log(
  "Car with climate control price:",
  carWithClimateControl.getPrice(),
);
