"use strict";

import BookCollection from "./scripts/BookCollectionModule.js";
import { BookCatalog, BookFilters } from "./scripts/BookLibraryModule.js";

// import {BookCatalog} from "./BookLibraryModule.js";

// // Consolidation of material
// 1. What is scope in JavaScript? What types of scopes do you know?
// Scope in JavaScript is an execution context that determines the availability of variables, functions, and objects in a certain part of the code. It controls where variables can be used and how long they exist in memory.
// Types of scopes:
// - Global scope — variables declared outside of any functions or blocks are available throughout the code. They exist throughout the entire life cycle of the program.
// - Local scope (Local/Function Scope) — variables declared inside a function are available only in this function and its nested functions. It is created when the function is called and destroyed after it completes.
// - Block scope — variables declared using let and const inside blocks {} (conditional statements, loops), are available only within this block. Appeared in ES6.
// - Lexical Scope — is determined by the structure of the code at the time of writing, not at runtime. Inner functions have access to variables of outer functions, but not vice versa.
// - Module Scope — variables declared in ES6 modules are only accessible inside the module, unless explicitly exported.
// - eval scope — a special scope created when using eval().
// 2. What is the role of namespaces in JavaScript? How do they help in resolving the problem of name conflicts?
// A namespace is a code organization concept that groups logically related entities under a single identifier to avoid name conflicts between different parts of the program or external libraries.
// Role of namespaces:
// - Avoiding name conflicts — prevents variables, functions, or objects with the same names from different libraries or modules from being overwritten.
// - Code organization - structures code into logical groups, making it easier to navigate and understand the architecture of the application.
// - Encapsulation - allows you to hide the internal implementation and expose only the public API.
// - Modularity - helps create independent components that can be developed, tested, and used separately.
// How they help resolve conflicts:
// - Unique prefixes - each library or module uses a unique prefix for its entities.
// - Hierarchical structure - creates nested namespaces for different levels of abstraction.
// - Context isolation - each namespace has its own context, which prevents "pollution" of the global scope.
// 3. What is the Module Pattern, and how does it help maintain code and avoid conflicts?
// The Module Pattern is a design pattern that uses closures to create private and public members, encapsulating related functionality into a single module.
// How it helps maintain code:
// - Encapsulation - Hides the internal implementation, exposing only the necessary public interface.
// - Code organization - Groups related functionality into logical units, making it easier to navigate and understand.
// - Private state - Allows you to have private variables and methods that are not accessible from the outside, preventing unwanted interference.
// - Controlled access - Provides control over how other parts of the program interact with the module.
// - Testing - Simplifies testing through a well-defined public API.
// How it helps avoid conflicts:
// - Unique identifiers - Each module has a unique name, preventing conflicts.
// - Dependency localization — all module dependencies are contained within the module.
// - Clear boundaries — clearly defined module boundaries prevent variables from "leaking" into the global scope.
// 4. What is the importance of code reuse?
// Code reuse is a fundamental principle of software development, which means creating components that can be used repeatedly in different parts of the program or in different projects.
// Importance:
// - Time savings — reduces development time by using ready-made and tested components.
// - Cost reduction — less code to write = less development and support costs.
// - Reliability improvement — reusable code is usually better tested and has fewer bugs.
// - Consistency — ensures consistency across different parts of the program.
// - Simplification of maintenance — changes are made in one place, rather than in many copies of the code.
// - Scalability — makes it easier to add new functionality and extend the system.
// - Quality improvement - code designed for reuse is usually better structured and documented.
// - Collaboration - facilitates team work through standardized components.
// 5. What design patterns do you know and in what cases can they be used to improve the quality and support of software?
// Classification of design patterns:
// Generative patterns (Creational):
// - Singleton - guarantees the presence of only one instance of a class. Used for global managers, configurations, database connections.
// - Factory - encapsulates the creation of objects. Used when the process of creating an object is complex or when you need to create objects based on certain conditions.
// - Abstract Factory - creates families of related objects. Used to create user interfaces with different styles.
// - Builder - separates the construction of a complex object from its presentation. Used to create complex objects with many parameters.
// - Prototype - creates new objects by cloning existing ones. Used when creating an object is more expensive than cloning.
// Structural Patterns:
// - Adapter — provides interface compatibility. Used to integrate old systems with new ones.
// - Decorator — dynamically adds new functionality to objects. Used to extend functionality without changing the class.
// - Facade — provides a simplified interface to a complex system. Used to simplify working with complex APIs.
// - Proxy — controls access to an object. Used for logging, caching, access control.
// - Composite — combines objects into tree structures. Used to work with hierarchical structures (menus, GUI).
// Behavioral Patterns:
// - Observer — defines a one-to-many relationship between objects. Used in event systems, reactive programming.
// - Strategy — encapsulates a family of algorithms. Used when there are multiple ways to perform an operation.
// - Command — encapsulates a query as an object. Used for task queues, undo/redo functionality.
// - Iterator — provides sequential access to elements of a collection. Used for working with collections of data.
// - State — allows an object to change its behavior when its state changes. Used for implementing finite state machines.
// Quality improvement applications:
// - Increasing flexibility — templates make code more adaptable to changes.
// - Simplifying maintenance — standardized solutions are easier to understand and modify.
// - Improving testability — templates facilitate the creation of testable code.
// - Reducing coupling — many patterns aim to reduce dependencies between components.
// - Improved readability - experienced developers recognize patterns in code.
// - Scalability - patterns help build architectures that scale easily.
// - Reusable - patterned solutions can be applied across projects.
// The choice of a specific pattern depends on the context of the problem, the complexity of the system, the development team, and the long-term goals of the project.

// Additional task

// Testing the module
console.log("=== TESTING LIBRARY CATALOG ===\n");
// 1. Adding books
console.log("1. Adding books to the catalog:");

BookCatalog.addBook(BookCollection.book1);
BookCatalog.addBook(BookCollection.book2);
BookCatalog.addBook(BookCollection.book3);
BookCatalog.addBook(BookCollection.book4);
BookCatalog.addBook(BookCollection.book5);

// 2. Attempt to add invalid book
console.log("\n2. Attempt to add invalid book:");
const book6 = {
  title: "",
  author: "Test author",
};
// BookCatalog.addBook(book6);

// 3. Search for books by title
console.log('\n3. Search for books by title "rings":');
const foundByTitle = BookCatalog.searchByTitle("rings");
console.log("Search results:", foundByTitle);

// 4. Search for books by author
console.log('\n4. Search for books by author "Tolkien":');
const foundByAuthor = BookCatalog.searchByAuthor("Tolkien");
console.log("Found books:", foundByAuthor.length);

// 5. Search for books by year
console.log("\n5. Search for books from 1997:");
const foundByYear = BookCatalog.searchByYear(1997);
console.log("Found:", foundByYear);

// 6. Retrieving a book by ID
console.log("\n6. Retrieving a book by ID:");
if (BookCollection.book1) {
  const retrievedBook = BookCatalog.getBookById(`book_1`);
  console.log("Retrieved book:", retrievedBook);
}

// 7. Removing a book
console.log("\n7. Removing a book:");
// BookCatalog.removeBook(`book_1`);

// 8. Get all books
console.log("\n8. All books in the catalog:");
const allBooks = BookCatalog.getAllBooks();
allBooks.forEach((book, index) => {
  console.log(
    `${index + 1}. "${book.title}" - ${book.author} (${book.year || "year not specified"})`,
  );
});

// 9. Library statistics
console.log("\n9. Library statistics:");
const stats = BookCatalog.getStatistics();
console.log("Total statistics:", stats);

// 10. Using the Filter Module
console.log("\n10. Using the Filter Module:");

// Sorting by title
console.log("Books sorted by title (A-Z):");
const sortedByTitle = BookFilters.sortByTitle(true);
sortedByTitle.forEach((book) => console.log(` - ${book.title}`));

// Filtering by genre
console.log('\nBooks of the "Fantasy" genre:');
const fantasyBooks = BookFilters.filterByGenre("Fantasy");
fantasyBooks.forEach((book) => console.log(` - ${book.title}`));

// Filtering by year range
console.log("\nBooks from 1900-2000:");
const booksInRange = BookFilters.filterByYearRange(1900, 2000);
booksInRange.forEach((book) => console.log(` - ${book.title} (${book.year})`));

// 11. Checking the privacy of variables
console.log("\n11. Attempt to access private variables:");
console.log("BookCatalog.books:", BookCatalog.books); // undefined
console.log("BookCatalog.nextId:", BookCatalog.nextId); // undefined
console.log("BookCatalog.generateUniqueId:", BookCatalog.generateUniqueId); // undefined

// 12. Additional test - cleaning the catalog
console.log("\n12. Cleaning the catalog:");
// BookCatalog.clearCatalog();
console.log("Books after cleaning:", BookCatalog.getAllBooks().length);

// Student Independent Activity

// Task 1: Namespaces
// Create the first namespace
const LibraryNamespace = {
  // A function named "calculate"
  calculate: function (a, b) {
    return a + b; // Addition
  },

  // Other functions in this namespace
  logMessage: function (message) {
    console.log(`[Library] ${message}`);
  },

  version: "1.0.0",
};

// Create the second namespace
const CalculatorNamespace = {
  // A function named "calculate"
  calculate: function (a, b) {
    return a * b; // Multiplication (different logic!)
  },

  // Other functions in this namespace
  logMessage: function (message) {
    console.log(`[Calculator] ${message}`);
  },

  version: "2.1.3",
};

// Testing calling functions with the same name
console.log("=== Task 1: Testing namespaces ===\n");

console.log("1. Calling calculate function from LibraryNamespace:");
const result1 = LibraryNamespace.calculate(5, 3);
console.log(`LibraryNamespace.calculate(5, 3) = ${result1}`); // 8

console.log("\n2. Calling calculate function from CalculatorNamespace:");
const result2 = CalculatorNamespace.calculate(5, 3);
console.log(`CalculatorNamespace.calculate(5, 3) = ${result2}`); // 15

console.log("\n3. Calling logMessage from both spaces:");
LibraryNamespace.logMessage("Hello from the library!");
CalculatorNamespace.logMessage("Hello from the calculator!");

console.log("\n4. Comparing versions:");
console.log(`LibraryNamespace version: ${LibraryNamespace.version}`);
console.log(`CalculatorNamespace version: ${CalculatorNamespace.version}`);

console.log("\n5. Attempted call without namespace:");
// calculate(5, 3); // ReferenceError: calculate is not defined
console.log("Error: calculate function not defined in global scope");

console.log("\n6. Adding third namespace:");
// You can create nested namespaces
const AppNamespace = {
  Library: LibraryNamespace,
  Calculator: CalculatorNamespace,

  // Your own version of calculate
  calculate: function (a, b) {
    return a / b; // Division
  },
};

console.log(`AppNamespace.calculate(10, 2) = ${AppNamespace.calculate(10, 2)}`); // 5
console.log(
  `AppNamespace.Library.calculate(10, 2) = ${AppNamespace.Library.calculate(10, 2)}`,
); // 12
console.log(
  `AppNamespace.Calculator.calculate(10, 2) = ${AppNamespace.Calculator.calculate(10, 2)}`,
); // 20

// Demonstration of use in a real scenario
console.log("\n7. Practical example of use:");
const data = { value: 100 };

// Each namespace has its own data processing
const libraryResult = LibraryNamespace.calculate(data.value, 50);
const calculatorResult = CalculatorNamespace.calculate(data.value, 50);

console.log(`Data processing ${data.value}:`);
console.log(`- Library (add 50): ${libraryResult}`);
console.log(`- Calculator (multiplication by 50): ${calculatorResult}`);

console.log(
  "\n✅ Conclusion: Functions with the same name do not conflict because they are in different namespaces.",
);

// Task 2: Module with private variables
// Create a module with private state
const MathModule = (function () {
  // PRIVATE variables (not accessible from outside)
  let secretMultiplier = 2;
  let secretBaseValue = 10;
  let callCount = 0;

  // PRIVATE function (not accessible from outside)
  function logOperation(operation, result) {
    callCount++;
    console.log(`[Module] Operation #${callCount}: ${operation} = ${result}`);
  }

  // PUBLIC API (accessible from outside)
  return {
    // Public function that uses private variables
    calculate: function (x) {
      const result = x * secretMultiplier + secretBaseValue;
      logOperation(`(${x} * ${secretMultiplier}) + ${secretBaseValue}`, result);
      return result;
    },

    // Other public functions
    getOperationCount: function () {
      return callCount;
    },

    // Function to change private variables (controlled access)
    setMultiplier: function (newMultiplier) {
      if (typeof newMultiplier === "number" && newMultiplier > 0) {
        secretMultiplier = newMultiplier;
        console.log(`Multiplier changed to: ${secretMultiplier}`);
      } else {
        console.error("Multiplier must be a positive number");
      }
    },

    setBaseValue: function (newBaseValue) {
      if (typeof newBaseValue === "number") {
        secretBaseValue = newBaseValue;
        console.log(`Base value changed to: ${secretBaseValue}`);
      } else {
        console.error("Base value must be a number");
      }
    },

    // For demonstration only - shows current settings
    getCurrentSettings: function () {
      return {
        multiplier: secretMultiplier,
        baseValue: secretBaseValue,
        calls: callCount,
      };
    },
  };
})(); // Self-invoked to create a closure

// Testing the module from external code
console.log("\n\n=== Task 2: Testing the module ===\n");

console.log("1. Using a public function from external code:");
const result11 = MathModule.calculate(5);
console.log(`Result 1: ${result11}`);

const result12 = MathModule.calculate(10);
console.log(`Result 2: ${result12}`);

console.log("\n2. Getting statistics:");
console.log(`Number of calls: ${MathModule.getOperationCount()}`);
console.log(`Current settings:`, MathModule.getCurrentSettings());

console.log("\n3. Changing settings via public methods:");
MathModule.setMultiplier(3);
MathModule.setBaseValue(20);

const result13 = MathModule.calculate(5);
console.log(`New result for 5: ${result13}`);

console.log("\n4. Attempt to access private variables from outside:");
console.log("MathModule.secretMultiplier:", MathModule.secretMultiplier); // undefined
console.log("MathModule.secretBaseValue:", MathModule.secretBaseValue); // undefined
console.log("MathModule.logOperation:", MathModule.logOperation); // undefined

console.log("\n5. Practical example of use:");
function processNumbers(numbers) {
  console.log("\nProcessing an array of numbers:");
  const processed = numbers.map((num) => MathModule.calculate(num));
  console.log("Input data:", numbers);
  console.log("Processed data:", processed);
  console.log("Total operations:", MathModule.getOperationCount());

  return processed;
}

const numbers = [1, 2, 3, 4, 5];
processNumbers(numbers);

console.log(
  "\n✅ Conclusion: The module encapsulates private variables, but provides a public API for working with them.",
);

// Task 3: Global and local variables
// GLOBAL variables and functions
const globalGreeting = "Hello from the global scope!";
let globalCounter = 0;

function globalFunction() {
  console.log("This is a global function call");
  globalCounter++;
  return globalCounter;
}

// Creating a demo constructor
function Person(name) {
  this.name = name;
  this.greet = function () {
    console.log(`${globalGreeting} My name is ${this.name}`);
  };
}

// Testing
console.log("\n\n=== Task 3: Global and local variables ===\n");

console.log("1. Accessing global variables in the global scope:");
console.log("globalGreeting:", globalGreeting);
console.log("globalCounter:", globalCounter);

console.log("\n2. Calling a global function:");
globalFunction();
console.log("globalCounter after call:", globalCounter);

// LOCAL function
function localFunction() {
  console.log("\n3. Inside local function:");

  // Local variables (only in this function)
  const localMessage = "This is a local message";
  let localCounter = 0;

  // ACCESS GLOBAL variables (possible)
  console.log("Access globalGreeting:", globalGreeting);
  console.log("Access globalCounter:", globalCounter);

  // CHANGE global variables (possible)
  globalCounter += 10;
  console.log("globalCounter after change:", globalCounter);

  // Call global function
  console.log("Call globalFunction from local function:");
  globalFunction();

  // Working with local variables
  localCounter++;
  console.log("localCounter:", localCounter);
  console.log("localMessage:", localMessage);

  // Nested function
  function nestedFunction() {
    console.log("\n4. Inside nested function:");

    // Accessing variables of external (local) function
    console.log("Accessing localMessage from nested:", localMessage);
    console.log("Accessing globalGreeting from nested:", globalGreeting);

    // Creating your own local variable
    const nestedVar = "Nested variable";
    console.log("nestedVar:", nestedVar);
  }

  nestedFunction();

  // Attempting to access a variable of a nested function (NOT POSSIBLE)
  // console.log(nestedVar); // ReferenceError

  return {
    localMessage,
    localCounter,
    getGlobalCounter: function () {
      return globalCounter;
    },
  };
}

console.log("\n5. Calling a local function from the global scope:");
const result = localFunction();

console.log("\n6. Accessing the result of a local function:");
console.log("result.localMessage:", result.localMessage);
console.log("result.localCounter:", result.localCounter);
console.log("result.getGlobalCounter():", result.getGlobalCounter());

console.log("\n7. Attempting to access local variables from the global scope:");
// console.log(localMessage); // ReferenceError: localMessage is not defined
// console.log(localCounter); // ReferenceError: localCounter is not defined
console.log("Error: local variables are not accessible from the global scope");

console.log("\n8. Example with block scope:");
if (true) {
  const blockVariable = "Block variable";
  let anotherBlockVar = 42;
  console.log("Inside a block:");
  console.log("blockVariable:", blockVariable);
  console.log("Accessing globalGreeting:", globalGreeting);

  // var has functional scope, not block scope
  var functionScopedVar = "I am accessible outside of block (var)";
}

// console.log(blockVariable); // ReferenceError
// console.log(anotherBlockVar); // ReferenceError
console.log("functionScopedVar:", functionScopedVar); // Works (var has functional scope)

console.log("\n9. Demonstration of scope chaining:");
function outerFunction() {
  const outerVar = "Outer variable";

  function middleFunction() {
    const middleVar = "Middle variable";

    function innerFunction() {
      console.log("\nScope chaining:");
      console.log("inner -> middleVar:", middleVar); // From middle
      console.log("inner -> outerVar:", outerVar); // From outer
      console.log("inner -> globalGreeting:", globalGreeting); // From global
    }

    innerFunction();
    // console.log(innerVar); // Error - not available from inner
  }

  middleFunction();
  // console.log(middleVar); // Error - not available from outer
}

outerFunction();

console.log(
  "\n✅ Conclusion: Local functions have access to global variables, but global code does not have access to local variables.",
);
