"use strict";

// Consolidation of Material

// 1. What is the main difference between standard and arrow functions in JavaScript?
// Key Differences:
// - this Context: Standard functions define their own this, while arrow functions use the this from their lexical scope.
// - arguments: Arrow functions don't have their own arguments object.
// - Constructor Capability: Arrow functions cannot be used with new.
// - Implicit Return: Arrow functions allow implicit return without return keyword for single expressions.
// 2. What is a closure (closure) in the context of standard functions?
// Closure is a function that "remembers" and has access to variables from its outer (enclosing) lexical scope even after that outer function has finished executing.
// Key Characteristics:
// - Functions in JavaScript form closures with their surrounding lexical environment
// - Closures preserve variable values between function calls
// - Essential for data privacy, function factories, and callbacks
// 3. What does IIFE mean? What is it used for?
// IIFE = Immediately Invoked Function Expression
// Definition: A function that is defined and executed immediately after creation.
// Main Uses:
// - Data Privacy/Creating Private Scope: Variables inside IIFE are not accessible from outside
// - Avoiding Global Pollution: Creates isolated scope without polluting global namespace
// - Module Pattern: Foundation for module systems before ES6 modules
// - Initialization: For code that needs to run once immediately
// - Loop Variable Capture: Fixing the classic closure-in-loop problem
// 4. What is currying? What are its main advantages?
// Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of nested functions, each taking a single argument.
// Main Advantages:
// - Partial Application: Create specialized functions from general ones
// - Function Composition: Easier to combine and chain functions
// - Code Reusability: Avoid code duplication with reusable function parts
// - Lazy Evaluation: Arguments can be supplied over time
// - Readability: Clear step-by-step argument processing
// 5. How does memoization help optimize program performance? What are its advantages?
// Memoization is an optimization technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again.
// Performance Benefits:
// - Redundant Computation Elimination: Avoids recalculating same results
// - Time Complexity Improvement: Can transform O(2ⁿ) to O(n) (as with Fibonacci)
// - Reduced CPU Usage: Saves processing power for expensive operations
// - Faster Response Times: Critical for real-time applications
// Main Advantages:
// - Speed: Dramatically improves performance for recursive or repetitive calculations
// - Efficiency: Reduces resource consumption (CPU, memory bandwidth)
// - Predictable Performance: Consistent execution time for repeated calls
// - Scalability: Makes algorithms practical for larger inputs
// - Transparent Optimization: Can be added without changing function logic
// Use Cases:
// - Mathematical computations (Fibonacci, factorials)
// - Expensive API calls with same parameters
// - Dynamic programming problems
// - Data transformation functions
// - Game state calculations
// Considerations:
// - Memory vs CPU trade-off (caching uses memory)
// - Only works for pure functions (same input = same output)
// - Cache invalidation strategy needed for changing data

// Additional Task

/**
 * Calculate the sum of all numbers from 1 to N (inclusive) asynchronously
 * @param {number} N - The upper bound of the range (inclusive)
 * @param {Function} callback - The callback function to execute with the result
 */
function calculateSum(N, callback) {
  // Initialize sum variable starting from 0
  let sum = 0;

  // Loop to add numbers from 1 to N
  for (let i = 1; i <= N; i++) {
    sum += i;
  }

  /**
   * Simulating asynchronous execution using setTimeout
   * In real scenarios, this could be replaced with actual async operations
   * like file reading, API calls, database queries, etc.
   */
  setTimeout(() => {
    // Call the callback function with the calculated sum
    callback(sum);
  }, 0);
}

// Example 1: Using an anonymous callback function
console.log("Starting calculation...");

calculateSum(10, function (result) {
  console.log(`The sum of numbers from 1 to 10 is: ${result}`);
});

// Example 2: Using a predefined named callback function
function displayResult(result) {
  console.log(`The calculated sum is: ${result}`);
}

calculateSum(5, displayResult);

// Example 3: Using an arrow function as callback
calculateSum(100, (sum) => {
  console.log(`Sum of 1 to 100: ${sum}`);
});

// Example 4: With additional processing in callback
calculateSum(20, function (result) {
  const average = result / 20;
  console.log(`Sum: ${result}, Average: ${average}`);
});

// Student Independent Activity

// Task 1: Function with callback
/**
 * Multiplies a number by 2 and passes the result to a callback function
 * @param {number} x - The number to multiply
 * @param {Function} callback - The callback function to execute with the result
 */
function multiplyByTwo(x, callback) {
  const result = x * 2;
  callback(result);
}
// Example 1: Simple console log callback
multiplyByTwo(5, function (result) {
  console.log(`Result: ${result}`);
});
// Example 2: Arrow function as callback
multiplyByTwo(10, (result) => {
  console.log(`10 * 2 = ${result}`);
});
// Example 3: Predefined callback function
function processResult(value) {
  console.log(`The doubled value is: ${value}`);
}
multiplyByTwo(7, processResult);
// Example 4: Chain of operations
multiplyByTwo(3, function (result) {
  console.log(`First result: ${result}`); // 6
  multiplyByTwo(result, function (newResult) {
    console.log(`Doubled again: ${newResult}`); // 12
  });
});
// Example 5: Error handling in callback (practical use case)
multiplyByTwo(-5, function (result) {
  if (result < 0) {
    console.log(`Warning: Negative result: ${result}`);
  } else {
    console.log(`Positive result: ${result}`);
  }
});

// Task 2: Currying
/**
 * Regular function that adds two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Sum of a and b
 */
function add(a, b) {
  return a + b;
}
console.log(`Regular add: ${add(5, 3)}`);
/**
 * Curried version of the add function
 * @param {number} a - First number
 * @returns {Function} - A function that takes b and returns the sum
 */
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}
const addFive = curriedAdd(5);
console.log(`curriedAdd(5)(3): ${curriedAdd(5)(3)}`);
console.log(`addFive(10): ${addFive(10)}`);

// Alternative implementation using arrow functions (more concise)
const curriedAddArrow = (a) => (b) => a + b;
// Using the arrow function version
const addTen = curriedAddArrow(10);
console.log(`curriedAddArrow(10)(3): ${curriedAddArrow(10)(5)}`);
console.log(`addTen(7): ${addTen(7)}`);
// Practical example: Creating specialized functions
const addTax = curriedAddArrow(20);
console.log(`Price with tax: ${addTax(100)}`);

// Creating multiple specialized functions
const addVAT = curriedAddArrow(23);
const addShipping = curriedAddArrow(5);
const productPrice = 50;
const priceWithVAT = addVAT(productPrice);
const finalPrice = addShipping(priceWithVAT);
console.log(`Original price: $${productPrice}`);
console.log(`Price with VAT: $${priceWithVAT}`);
console.log(`Final price with shipping: $${finalPrice}`);

// Generic curry function that can curry any function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
const curriedAddGeneric = curry(add);
console.log(`Generic curry add(5)(3): ${curriedAddGeneric(5)(3)}`);

// Task 3: Function for calculating the area of ​​a rectangle
/**
 * Calculates the area of a rectangle
 * @param {number} width - Width of the rectangle
 * @param {number} height - Height of the rectangle
 * @returns {number} - Area of the rectangle (width * height)
 */
function calculateRectangleArea(width, height) {
  return width * height;
}
// Calculating area of rectangle with sides 5 and 10
const width = 5;
const height = 10;
const area = calculateRectangleArea(width, height);
console.log(`Rectangle with width ${width} and height ${height}`);
console.log(`Area: ${area}`);
// Additional examples with different rectangles
console.log("\n--- Additional examples ---");
// Square (special case of rectangle)
const squareArea = calculateRectangleArea(4, 4);
console.log(`Square area (4x4): ${squareArea}`);
// Large rectangle
const largeArea = calculateRectangleArea(25, 40);
console.log(`Large rectangle area (25x40): ${largeArea}`);

// Error handling example
function calculateRectangleAreaWithValidation(width, height) {
  // Input validation
  if (typeof width !== "number" || typeof height !== "number") {
    throw new Error("Width and height must be numbers");
  }

  if (width <= 0 || height <= 0) {
    throw new Error("Width and height must be positive numbers");
  }

  return width * height;
}
// Testing validation
try {
  const validArea = calculateRectangleAreaWithValidation(5, 10);
  console.log(`Valid area: ${validArea}`);

  // This will throw an error
  // const invalidArea = calculateRectangleAreaWithValidation(-5, 10);
} catch (error) {
  console.error(`Error: ${error.message}`);
}

// Using the function in a practical context
function calculateRoomArea() {
  const rooms = [
    { name: "Living room", width: 6, height: 5 },
    { name: "Bedroom", width: 4, height: 4.5 },
    { name: "Kitchen", width: 3.5, height: 4 },
  ];

  let totalArea = 0;
  rooms.forEach((room) => {
    const roomArea = calculateRectangleArea(room.width, room.height);
    console.log(
      `${room.name}: ${room.width}m * ${room.height}m = ${roomArea}m²`,
    );
    totalArea += roomArea;
  });
  console.log(`Total apartment area: ${totalArea}m²`);
}
calculateRoomArea();

// Task 4: Refactoring on arrow function
/**
 * Arrow function version of calculateRectangleArea
 * Calculates the area of a rectangle
 * @param {number} width - Width of the rectangle
 * @param {number} height - Height of the rectangle
 * @returns {number} - Area of the rectangle (width * height)
 */
const calculateRectangleAreaArrow = (width, height) => width * height;
// Calculating area of rectangle with sides 5 and 10
const areaArrow = calculateRectangleAreaArrow(width, height);

console.log(`Rectangle with width ${width} and height ${height}`);
console.log(`Area: ${area}`); 

// Additional examples to verify the function works the same

// Example 1: Square
console.log(`Square (7x7): ${calculateRectangleAreaArrow(7, 7)}`); 

// Example 2: Zero area (edge case)
console.log(`Zero dimensions (0x10): ${calculateRectangleAreaArrow(0, 10)}`); 

// Example 3: Decimal dimensions
console.log(
  `Decimal dimensions (2.5x3.5): ${calculateRectangleAreaArrow(2.5, 3.5)}`,
); 

// Arrow function with explicit return (alternative syntax for complex operations)
const calculateRectangleAreaWithLogging = (width, height) => {
  console.log(`Calculating area for ${width}x${height}`);
  const area = width * height;
  console.log(`Result: ${area}`);
  return area;
};

// Using the version with logging
console.log("\n--- With logging ---");
const loggedArea = calculateRectangleAreaWithLogging(8, 6); 

// Higher-order arrow function example
const createAreaCalculator =
  (multiplier = 1) =>
  (width, height) => {
    return width * height * multiplier;
  };

// Creating specialized calculators
const calculateSquareMeters = createAreaCalculator(1);
const calculateSquareFeet = createAreaCalculator(10.7639); 

const roomWidth = 5;
const roomHeight = 4;

console.log(`\nRoom dimensions: ${roomWidth}m x ${roomHeight}m`);
console.log(
  `Area in square meters: ${calculateSquareMeters(roomWidth, roomHeight)} m²`,
);
console.log(
  `Area in square feet: ${calculateSquareFeet(roomWidth, roomHeight)} ft²`,
);

// Testing with the original requirements
console.log("\n--- Original requirement verification ---");
const testArea = calculateRectangleArea(5, 10);
console.log(`Test: calculateRectangleArea(5, 10) = ${testArea}`);
console.log(`Expected: 50`);
console.log(`Test passed: ${testArea === 50}`);
