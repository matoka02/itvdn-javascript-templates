"use strict";

import Cafe from "./scripts/cafe/CafeModule.js";
import BeverageFactory from "./scripts/cafe/BeverageFactoryModule.js";

import OrderFacade from "./scripts/store/OrderFacadeModule.js";

import Product from "./scripts/onlineStore/ProductModule.js";
import {
  BundleDiscount,
  BuyOneGetOneFree,
  FixedAmountDiscount,
  LoyaltyDiscount,
  PercentageDiscount,
  SeasonalDiscount,
} from "./scripts/onlineStore/ConcreteDecoratorsModule.js";
import ShoppingCart from "./scripts/onlineStore/ShoppingCartModule.js";

import TaskManager from "./scripts/tasks/TaskManagerModule.js";

// Consolidation of material

// 1. What are generative programming patterns and what is their main purpose?
// Creational Patterns are design patterns that are responsible for the process of creating objects.
// Main purpose: To abstract (hide) the logic of creating class instances. They help make the system independent of how its objects are created, composed, and represented. This increases flexibility and allows code reuse without being tied to specific classes (but only to interfaces).
// 2. What are the main principles underlying structural programming patterns?
// Structural Patterns are based on the principles of composition and inheritance.
// Their main task is to build more complex structures by combining classes and objects. Key principles:
// - Composition (using objects inside other objects) often has an advantage over inheritance, as it allows you to change behavior on the fly.
// - Extending functionality without changing the code of existing classes.
// - Simplifying interfaces for complex systems.
// 3. Give examples of scenarios when it is better to use Singleton and Factory programming patterns.
// 1) Singleton:
// - Scenario: When the program should have exactly one instance of a certain class, accessible from anywhere in the program.
// - Example: Database connection manager (connection pool), logging object (Logger), configuration file (Configuration Manager), hardware resource management (printer).
// 2) Factory Method / Abstract Factory:
// - Scenario: When the system needs to create objects, but the type of these objects (class) is unknown in advance or is determined by conditions (settings, OS, user choice).
// - Example: Creating UI objects (buttons/windows) for different operating systems (Windows vs MacOS), creating different payment types (CreditCard, PayPal, Crypto) depending on the user's choice.
// 4. What is the role of the Facade pattern in software architecture, and in what situations can its use be useful?
// Role: The Facade pattern provides a simple, unified interface instead of a complex system of interfaces (subsystems, libraries, frameworks). It acts as a "window" or control panel, hiding the internal complexity.
// Use cases:
// - Complex libraries: When you need to work with a library that has hundreds of methods, but the programmer only needs 2-3 simple actions (for example, converting a video).
// - API simplification: When you need to reduce the dependency of client code on the internal architecture of a large system.
// - Refactoring: When an old system has messy code, Facade allows you to gradually replace parts of it, providing a new clean interface.
// 5. What is the main principle of the Proxy pattern, and what advantages can it have in programming?
// Main principle: A Proxy is a class that replaces a real object and controls access to it. It intercepts calls to the original object, adding its own logic before, after, or instead of calling the real object. This implements the principle of Lazy Initialization.
// Advantages:
// - Lazy Loading: Creating a "heavy" object only when it is really needed, and not immediately at program startup.
// - Access Control (Security): Checking access rights before passing the request to the original object.
// - Logging and auditing: Automatic recording of actions performed on an object.
// - Remote access (RPC): Representing an object that is physically located on another server as a local object (for example, web services).
// - Caching: Saving the results of frequent queries to avoid performing complex calculations repeatedly.

// Additional task

// ============================================
// 4. Demonstration and Testing
// ============================================

/**
 * Main function to demonstrate the Singleton and Factory patterns
 */
function demonstrateCafeSystem() {
  console.clear();
  console.log("🚀 STARTING CAFE MANAGEMENT SYSTEM DEMO\n");
  console.log("=".repeat(70));

  // ============================================
  // Step 1: Get the singleton Cafe instance
  // ============================================

  const cafe1 = Cafe.getInstance();
  const cafe2 = Cafe.getInstance();

  console.log(`✅ Singleton pattern verified:`);
  console.log(`   cafe1 === cafe2: ${cafe1 === cafe2} (Same instance)\n`);

  // ============================================
  // Step 2: Display cafe information
  // ============================================

  cafe1.getInfo();

  // ============================================
  // Step 3: Create beverages using Factory pattern
  // ============================================

  console.log("\n" + "☕".repeat(15));
  console.log("☕ CREATING BEVERAGES WITH FACTORY PATTERN");
  console.log("☕".repeat(15));

  // Create individual beverages
  const espresso = BeverageFactory.createBeverage("espresso", {
    price: 2.5,
    name: "Double Espresso",
  });

  const latte = BeverageFactory.createBeverage("latte", {
    price: 4.8,
    isHot: true,
    name: "Vanilla Latte",
  });

  const cappuccino = BeverageFactory.createBeverage("cappuccino", {
    price: 4.5,
    name: "Classic Cappuccino",
  });

  const greenTea = BeverageFactory.createBeverage("green tea", {
    price: 3.2,
    name: "Japanese Sencha",
  });

  const lemonade = BeverageFactory.createBeverage("lemonade", {
    price: 4.0,
    name: "Fresh Lemonade",
  });

  const hotChocolate = BeverageFactory.createBeverage("hot chocolate", {
    price: 4.5,
    name: "Belgian Hot Chocolate",
  });

  // Create multiple beverages at once
  const summerDrinks = BeverageFactory.createMultipleBeverages([
    { type: "smoothie", options: { name: "Mango Smoothie", price: 5.5 } },
    {
      type: "orange juice",
      options: { name: "Fresh Orange Juice", price: 4.2 },
    },
    {
      type: "herbal tea",
      options: { name: "Chamomile Tea", price: 3.5, isHot: true },
    },
  ]);

  // ============================================
  // Step 4: Add beverages to cafe menu
  // ============================================

  console.log("\n" + "📋".repeat(15));
  console.log("📋 ADDING BEVERAGES TO MENU");
  console.log("📋".repeat(15));

  cafe1.addToMenu(espresso.id, espresso);
  cafe1.addToMenu(latte.id, latte);
  cafe1.addToMenu(cappuccino.id, cappuccino);
  cafe1.addToMenu(greenTea.id, greenTea);
  cafe1.addToMenu(lemonade.id, lemonade);
  cafe1.addToMenu(hotChocolate.id, hotChocolate);

  // Add the summer drinks
  summerDrinks.forEach((drink) => {
    cafe1.addToMenu(drink.id, drink);
  });

  // ============================================
  // Step 5: Display full menu
  // ============================================

  cafe1.displayMenu();

  // ============================================
  // Step 6: Perform operations on beverages
  // ============================================

  console.log("🔄".repeat(15));
  console.log("🔄 BEVERAGE OPERATIONS");
  console.log("🔄".repeat(15));

  // Apply discount to some beverages
  espresso.applyDiscount(10); // 10% discount
  latte.toggleAvailability(); // Make latte unavailable
  lemonade.applyDiscount(15); // 15% discount

  // Display individual beverage info
  console.log("\n📄 Beverage Information:");
  console.log("-".repeat(40));
  console.log(espresso.getInfo());
  console.log(latte.getInfo());
  console.log(cappuccino.getInfo());
  console.log(greenTea.getInfo());

  // ============================================
  // Step 7: Place orders
  // ============================================

  console.log("\n" + "🧾".repeat(15));
  console.log("🧾 PLACING ORDERS");
  console.log("🧾".repeat(15));

  // First order
  console.log("\n👤 Customer 1 Order:");
  cafe1.placeOrder([espresso, cappuccino, lemonade]);

  // Second order
  console.log("\n👤 Customer 2 Order:");
  cafe1.placeOrder([latte, greenTea, hotChocolate]);

  // Third order (includes unavailable item)
  console.log("\n👤 Customer 3 Order:");
  cafe1.placeOrder([latte, espresso, lemonade, greenTea]);

  // ============================================
  // Step 8: Add custom beverage
  // ============================================

  console.log("\n" + "✨".repeat(15));
  console.log("✨ ADDING CUSTOM BEVERAGE");
  console.log("✨".repeat(15));

  const customDrink = BeverageFactory.createBeverage("custom", {
    name: "CyberBionic Special",
    price: 6.99,
    customCategory: "Signature Drink",
    isHot: false,
  });

  cafe1.addToMenu(customDrink.id, customDrink);
  console.log(`✨ Created: ${customDrink.getInfo()}`);

  // ============================================
  // Step 9: Display statistics
  // ============================================

  cafe1.getStatistics();

  // ============================================
  // Step 10: Demonstrate factory capabilities
  // ============================================

  console.log("\n" + "🏭".repeat(15));
  console.log("🏭 FACTORY PATTERN DEMONSTRATION");
  console.log("🏭".repeat(15));

  console.log("Available beverage types:");
  let output = "";
  BeverageFactory.getAvailableTypes().forEach((type, index) => {
    output += `   ${(index + 1).toString().padStart(2)}. ${type.padEnd(15)}`;
    if ((index + 1) % 4 === 0) {
      console.log(output);
      output = "";
    }
  });
  if (output) console.log(output);
  console.log("\n");

  // ============================================
  // Step 11: Final summary
  // ============================================

  console.log("\n" + "🎯".repeat(15));
  console.log("🎯 DEMONSTRATION COMPLETE");
  console.log("🎯".repeat(15));
  console.log(`
✅ Singleton Pattern: Successfully created single cafe instance
✅ Factory Pattern: Successfully created various beverage types
✅ Beverage Class: Successfully implemented with all properties and methods
✅ Menu Management: Successfully added and removed beverages
✅ Operations: Successfully applied discounts, toggled availability
✅ Order System: Successfully processed orders with tax calculation
    `);
}

// ============================================
// 5. Run the demonstration
// ============================================

// Execute the demonstration
// demonstrateCafeSystem();

// ============================================
// 6. Additional verification of Singleton
// ============================================

console.log("\n" + "🔍".repeat(15));
console.log("🔍 SINGLETON VERIFICATION");
console.log("🔍".repeat(15));

const anotherCafeReference = Cafe.getInstance();
console.log(`🔍 Attempting to create another cafe instance...`);
console.log(
  `🔍 Result: ${anotherCafeReference === Cafe.getInstance() ? "Same instance (Singleton works!)" : "Different instances (Singleton failed!)"}`,
);
console.log(`🔍 Cafe name: ${anotherCafeReference.name}`);

// Self-Study Activities
// Task 1: Online Store Order System with Facade Pattern

// ============================================
// Demonstration of Facade Pattern
// ============================================

function demonstrateFacadePattern() {
  console.log("\n" + "🎭".repeat(20));
  console.log("🎭 FACADE PATTERN DEMONSTRATION");
  console.log("🎭".repeat(20));

  // Create facade instance
  const orderFacade = new OrderFacade();

  // Example 1: Simple order
  console.log("\n📝 EXAMPLE 1: Simple Laptop Order");
  const order1 = OrderFacade.placeOrder(
    [{ productName: "Laptop", quantity: 1 }],
    { method: "credit_card" },
    { method: "express" },
  );

  // Example 2: Multiple items order
  console.log("\n📝 EXAMPLE 2: Multiple Items Order");
  const order2 = orderFacade.placeOrder(
    [
      { productName: "Mouse", quantity: 2 },
      { productName: "Keyboard", quantity: 1 },
      { productName: "Headphones", quantity: 1 },
    ],
    { method: "paypal" },
    { method: "standard" },
  );

  // Example 3: Order with unavailable item
  console.log("\n📝 EXAMPLE 3: Order with Unavailable Item");
  const order3 = orderFacade.placeOrder(
    [
      { productName: "Webcam", quantity: 1 },
      { productName: "USB Cable", quantity: 3 },
    ],
    { method: "bank_transfer" },
    { method: "overnight" },
  );

  // Check order status
  if (order1.success) {
    console.log("\n🔍 Checking order status...");
    const status = orderFacade.getOrderStatus(order1.orderId);
    console.log(`Order ${status.orderId}: ${status.status}`);
  }

  console.log("\n🎭 Facade pattern demonstration completed!\n");
}

// Run demonstration
// demonstrateFacadePattern();

// Task 2: Online Store with Discounts using Decorator Pattern

// ============================================
// Demonstration of Decorator Pattern
// ============================================

function demonstrateDecoratorPattern() {
  console.log("\n" + "🎨".repeat(20));
  console.log("🎨 DECORATOR PATTERN DEMONSTRATION");
  console.log("🎨".repeat(20));

  // Create base products
  console.log("\n📦 Creating base products...");

  const laptop = new Product("Gaming Laptop", 1299.99, "Electronics");
  const phone = new Product("Smartphone", 699.99, "Electronics");
  const headphones = new Product("Wireless Headphones", 149.99, "Audio");
  const mouse = new Product("Gaming Mouse", 59.99, "Accessories");
  const keyboard = new Product("Mechanical Keyboard", 129.99, "Accessories");
  const monitor = new Product("4K Monitor", 399.99, "Electronics");
  const tablet = new Product("Tablet", 449.99, "Electronics");
  const bag = new Product("Laptop Bag", 49.99, "Accessories");

  // Apply single discounts
  console.log("\n💰 Applying single discounts...");

  const laptop10Off = new PercentageDiscount(laptop, 10);
  const phoneFixedOff = new FixedAmountDiscount(phone, 50);
  const headphonesBOGO = new BuyOneGetOneFree(headphones);
  const mouseSeasonal = new SeasonalDiscount(mouse, 20, "Black Friday");
  const keyboardLoyalty = new LoyaltyDiscount(keyboard, "Gold");
  const monitorBundle = new BundleDiscount(monitor, "Gamer Bundle", 15);
  const tabletLoyalty = new LoyaltyDiscount(tablet, "Platinum");
  const bagClearance = new PercentageDiscount(bag, 30);

  // Apply multiple decorators (stacked discounts)
  console.log("\n📊 Applying stacked discounts (multiple decorators)...");

  // Laptop: 10% off + Loyalty 15% = 25% total
  const laptopGoldLoyalty = new LoyaltyDiscount(laptop10Off, "Gold");

  // Monitor: Bundle 15% + Seasonal 10% = 25% total
  const monitorSeasonal = new SeasonalDiscount(
    monitorBundle,
    10,
    "Cyber Monday",
  );

  // Headphones: BOGO + Loyalty 10% = 55% effective discount
  const headphonesLoyalty = new LoyaltyDiscount(headphonesBOGO, "Silver");

  // Create shopping cart and add items
  console.log("\n🛒 Adding items to cart...");

  const cart = new ShoppingCart();

  cart.addItem(laptopGoldLoyalty);
  cart.addItem(phoneFixedOff);
  cart.addItem(headphonesLoyalty, 2); // Buy 2 for BOGO effect
  cart.addItem(keyboardLoyalty);
  cart.addItem(monitorSeasonal);
  cart.addItem(mouseSeasonal);
  cart.addItem(tabletLoyalty);
  cart.addItem(bagClearance);

  // Display cart
  cart.displayCart();

  // Compare original vs discounted prices
  console.log("\n📈 PRICE COMPARISON:");
  console.log("-".repeat(50));

  const products = [
    { name: "Laptop", original: laptop, discounted: laptopGoldLoyalty },
    { name: "Phone", original: phone, discounted: phoneFixedOff },
    { name: "Headphones", original: headphones, discounted: headphonesLoyalty },
    { name: "Keyboard", original: keyboard, discounted: keyboardLoyalty },
    { name: "Monitor", original: monitor, discounted: monitorSeasonal },
    { name: "Mouse", original: mouse, discounted: mouseSeasonal },
    { name: "Tablet", original: tablet, discounted: tabletLoyalty },
    { name: "Bag", original: bag, discounted: bagClearance },
  ];

  products.forEach((p) => {
    const originalPrice = p.original.getPrice();
    const discountedPrice = p.discounted.getPrice();
    const savings = originalPrice - discountedPrice;
    const percentSaved = ((savings / originalPrice) * 100).toFixed(1);

    console.log(
      `${p.name.padEnd(15)}: $${originalPrice.toFixed(2)} → $${discountedPrice.toFixed(2)} ` +
        `(Save $${savings.toFixed(2)} | ${percentSaved}% off)`,
    );
  });

  // Demonstrate decorator flexibility
  console.log("\n🔄 CHAINING MULTIPLE DECORATORS:");
  console.log("-".repeat(50));

  // Ultra discount: Base + Seasonal + Loyalty + Bundle
  const ultraDiscount = new PercentageDiscount(
    new SeasonalDiscount(
      new LoyaltyDiscount(
        new BundleDiscount(laptop, "Ultimate", 25),
        "Platinum",
      ),
      15,
      "Holiday",
    ),
    10,
  );

  const finalPrice = ultraDiscount.getPrice();
  const originalPrice = laptop.getPrice();
  const totalSavings = originalPrice - finalPrice;
  const totalPercent = ((totalSavings / originalPrice) * 100).toFixed(1);

  console.log(`Laptop Ultimate Stack:`);
  console.log(`   Original: $${originalPrice.toFixed(2)}`);
  console.log(`   Final: $${finalPrice.toFixed(2)}`);
  console.log(
    `   Total Savings: $${totalSavings.toFixed(2)} (${totalPercent}% off)`,
  );
  console.log(`   Description: ${ultraDiscount.getDescription()}`);

  console.log("\n🎨 Decorator pattern demonstration completed!\n");
}

// Run demonstration
// demonstrateDecoratorPattern();

// Task 3: Task Manager with Singleton Pattern

// ============================================
// Demonstration of Singleton Pattern
// ============================================

function demonstrateSingletonPattern() {
  console.log("\n" + "🔷".repeat(20));
  console.log("🔷 SINGLETON PATTERN DEMONSTRATION");
  console.log("🔷".repeat(20));

  // Get TaskManager instance
  const taskManager1 = TaskManager.getInstance();
  const taskManager2 = TaskManager.getInstance();

  // Verify singleton
  console.log(`\n🔍 Singleton verification:`);
  console.log(
    `   taskManager1 === taskManager2: ${taskManager1 === taskManager2}`,
  );
  console.log(`   Both references point to the same instance ✓\n`);

  // Create tasks
  console.log("📝 Creating tasks...\n");

  const task1 = taskManager1.createTask("Complete JavaScript project", {
    description: "Implement Singleton, Facade, and Decorator patterns",
    priority: "high",
    category: "Study",
    tags: ["javascript", "patterns", "homework"],
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
  });

  const task2 = taskManager1.createTask("Buy groceries", {
    description: "Milk, eggs, bread, fruits",
    priority: "medium",
    category: "Shopping",
    tags: ["personal", "shopping"],
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
  });

  const task3 = taskManager1.createTask("Prepare presentation", {
    description: "Create slides for team meeting",
    priority: "critical",
    category: "Work",
    tags: ["work", "presentation"],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
  });

  const task4 = taskManager1.createTask("Read book", {
    description: 'Finish reading "Clean Code"',
    priority: "low",
    category: "Personal",
    tags: ["reading", "learning"],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  const task5 = taskManager1.createTask("Workout", {
    description: "Gym session - cardio and strength",
    priority: "medium",
    category: "Personal",
    tags: ["health", "fitness"],
  });

  // Display all tasks
  taskManager1.displayTasks();

  // Complete a task
  console.log("✅ Completing task...\n");
  taskManager1.completeTask(task2.id);

  // Update a task
  console.log("\n✏️ Updating task...\n");
  taskManager1.updateTask(task1.id, {
    priority: "critical",
    description: "Implement all design patterns with examples",
  });
  taskManager1.updateTask(task1.id, {
    title: "Complete JavaScript Design Patterns",
  });

  // Add tags to task
  console.log("\n🏷️ Adding tags...\n");
  taskManager1.getTask(task3.id).addTag("urgent");
  taskManager1.getTask(task3.id).addTag("meeting");

  // Display statistics
  taskManager1.displayStats();

  // Filter tasks
  console.log("🔍 Filtered tasks (High Priority):");
  taskManager1.displayTasks({ priority: "high" });

  console.log("🔍 Filtered tasks (Active only):");
  taskManager1.displayTasks({ showCompleted: false });

  // Search tasks
  console.log('🔍 Search results for "JavaScript":');
  const searchResults = taskManager1.searchTasks("JavaScript");
  console.log(`Found ${searchResults.length} task(s)\n`);

  // Get overdue tasks
  const overdueTasks = taskManager1.getOverdueTasks();
  console.log(`⚠️ Overdue tasks: ${overdueTasks.length}`);

  // Use the second reference to demonstrate same instance
  console.log("\n📊 Accessing via second reference:");
  const stats = taskManager2.getStats();
  console.log(`   Total tasks: ${stats.totalTasks}`);
  console.log(`   Completed tasks: ${stats.completedTasks}`);

  // Delete a task
  console.log("\n🗑️ Deleting task...");
  taskManager1.deleteTask(task4.id);

  // Display updated task list
  taskManager1.displayTasks();

  // Clear completed tasks
  console.log("\n🧹 Clearing completed tasks...");
  taskManager1.clearCompletedTasks();

  // Final statistics
  taskManager1.displayStats();

  // Export tasks
  console.log("\n📤 Exporting tasks...");
  const exportData = taskManager1.exportToJSON();
  console.log(`   Exported ${exportData.taskCount} tasks`);
  console.log(`   Categories: ${exportData.categories.join(", ")}`);

  console.log("\n🔷 Singleton pattern demonstration completed!\n");
}

// Run demonstration
// demonstrateSingletonPattern();
