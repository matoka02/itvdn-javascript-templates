"use strict";

import {
  EmailService,
  NotificationService,
  NotificationSystem,
  SMSService,
  User,
} from "./scripts/NotificationSystemModule.js";

import {
  DiscountObserver,
  EmailNotificationObserver,
  InventoryObserver,
  ShoppingCart,
  UserInterfaceObserver,
} from "./scripts/ShoppingModule.js";

import {
  SortStrategy,
  AscendingSort,
  DescendingSort,
  StringLengthSort,
  RandomSort,
  BubbleSort,
  SelectionSort,
  Sorter,
} from "./scripts/SortingModule.js";

import {
  ChatRoom,
  User as ChatUser,
  AdminUser,
  BotUser,
} from "./scripts/ChatModule.js";

import {
  ArrayIterator,
  FilterIterator,
  IterableCollection,
  NumberCollection,
  LinkedList,
} from "./scripts/DataModule.js";

// Consolidation of material
// 1. What is a behavioral design pattern and why is it important?
// A behavioral pattern is a design template that defines how objects interact and share responsibilities.
// Why it is important:
// - Reduces coupling between components
// - Increases flexibility - easy to change behavior without modifying existing code
// - Encapsulates algorithms - hides interaction complexity
// - Improves support - clearly defined responsibilities
// 2. Main features of the Observer and Mediator patterns
// Observer:
// - One-to-many - one subject notifies all subscribers
// - Weak coupling - observers do not know about each other
// - Automatic notification - state change = automatic notification
// Example: Event listeners, RxJS, Vue reactivity
// Mediator:
// - Many-to-many through a hub - objects communicate only through a mediator
// - Centralized management - all interaction logic in one place
// - Reduces direct dependencies - objects only know about the mediator
// Example: Chat room, flight controller, Redux
// 3. In which cases is it appropriate to use the pattern Strategy?
// It is advisable to use when:
// - Different algorithm variants — multiple ways to perform the same operation
// - Avoiding conditional statements — replacing if/else or switch
// - Choosing behavior at runtime — algorithm is determined dynamically
// - Extension without modification — Open/Closed Principle
// Examples:
// - Different payment methods (card, PayPal, cryptocurrency)
// - Sorting algorithms (by price, rating, date)
// - Form validation (different rules for different fields)
// 4. Advantages of the Mediator pattern over direct object-to-object communication:
// - Reduces the number of direct connections between objects, turning a complex network of interactions into a centralized control
// - Makes it easier to add new components that do not need to know about the structure of existing ones
// - Increases the reuse of individual components in different contexts
// - Centralizes the interaction logic in one place, which makes it easier to maintain and debug
// - Reduces dependencies between components, making the system more modular
// 5. Strategies for iterating through collections and the advantages of using an iterator:
// Iteration strategies:
// - Inner iteration - the collection itself controls the traversal process
// - External iteration - the client controls the traversal steps
// - Sequential iteration - only forward movement through the collection
// - Bidirectional iteration - the ability to move forward and backward
// - Lazy iteration - elements are generated only when query
// Benefits of using an iterator:
// - Encapsulates the details of the internal structure of a collection
// - Provides a single unified interface for traversing different types of collections
// - Allows you to have multiple independent iterators for the same collection at the same time
// - Separates traversal algorithms from the data structure itself
// - Allows you to implement different traversal methods without changing the collection code

// Additional task
// Notification System with Observer Pattern

// ============ DEMONSTRATION ============

console.log("=== NOTIFICATION SYSTEM OBSERVER PATTERN ===\n");
// 1. Create services
const emailService = new EmailService();
const smsService = new SMSService();

// 2. Create notification system
const notificationSystem = new NotificationSystem();

// 3. Register services
notificationSystem.registerService("EMAIL", emailService);
notificationSystem.registerService("SMS", smsService);

// 4. Create users
const user1 = new User(1, "John Doe", "john@email.com", "+380501234567");
const user2 = new User(2, "Jane Smith", "jane@email.com", "+380507654321");
const user3 = new User(3, "Bob Johnson", "bob@email.com", "+380509876543");

// 5. Register users in system
notificationSystem.registerUser(user1);
notificationSystem.registerUser(user2);
notificationSystem.registerUser(user3);

// 6. Subscribe users to different services
console.log("\n=== SUBSCRIPTIONS ===");
notificationSystem.subscribe(1, "EMAIL"); // John gets emails
notificationSystem.subscribe(1, "SMS"); // John also gets SMS
notificationSystem.subscribe(2, "EMAIL"); // Jane gets emails only
notificationSystem.subscribe(3, "SMS"); // Bob gets SMS only

// 7. Send notifications
console.log("\n=== SENDING NOTIFICATIONS ===");

// Send notification to all EMAIL subscribers
notificationSystem.notifyAll("EMAIL", "Welcome to our platform!");

// Send notification to all SMS subscribers
notificationSystem.notifyAll("SMS", "Your verification code is 123456");

// Send notification to specific user
notificationSystem.notifyUser(1, "Your order has been shipped");

// Broadcast to everyone
notificationSystem.broadcast("System maintenance tonight at 2 AM");

// 8. Unsubscribe example
console.log("\n=== UNSUBSCRIBE ===");
notificationSystem.unsubscribe(1, "SMS");

// Verify unsubscribe
notificationSystem.notifyAll("SMS", "Test message after unsubscribe");

// 9. System statistics
notificationSystem.getStats();

// ============ ADVANCED SCENARIO ============

// Create additional service
class PushNotificationService extends NotificationService {
  sendNotification(user, message) {
    console.log(`📲 PUSH to ${user.name}'s device: ${message}`);
  }
}

// Register new service
const pushService = new PushNotificationService();
notificationSystem.registerService("PUSH", pushService);

// Subscribe some users to push notifications
notificationSystem.subscribe(2, "PUSH"); // Jane subscribes to push
notificationSystem.subscribe(3, "PUSH"); // Bob subscribes to push

// Send urgent notification through all channels
console.log("\n=== URGENT NOTIFICATION ===");
const urgentMessage = "⚠️ CRITICAL: System will be down in 10 minutes!";

notificationSystem.users.forEach((user) => {
  user.notificationPreferences.forEach((service) => {
    service.sendNotification(user, urgentMessage);
  });
});

// Final statistics
notificationSystem.getStats();

// Self-Study Activities
// Task 1: Observer Pattern - Shopping cart

// Demonstration
console.log("=== SHOPPING CART OBSERVER PATTERN ===\n");

// Create cart
const cart = new ShoppingCart();

// Create observers
const uiObserver = new UserInterfaceObserver("WebApp");
const emailObserver = new EmailNotificationObserver("customer@example.com");
const discountObserver = new DiscountObserver();
const inventoryObserver = new InventoryObserver();

// Subscribe observers
cart.addObserver(uiObserver);
cart.addObserver(emailObserver);
cart.addObserver(discountObserver);
cart.addObserver(inventoryObserver);

// Create products
const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
  { id: 4, name: "Monitor", price: 299 },
];

// Test cart operations
console.log("--- Adding items ---");
cart.addItem(products[0]);
cart.addItem(products[1]);
cart.addItem(products[2]);

console.log("\n--- Removing item ---");
// cart.removeItem(2);

console.log("\n--- Add expensive item (trigger discount) ---");
cart.addItem(products[3]);

console.log("\n--- Clear cart ---");
// cart.clearCart();

// Demonstrate unsubscribe
console.log("\n--- Remove email observer ---");
// cart.removeObserver(emailObserver);
// cart.addItem(products[0]); // Email observer won't receive this

// Task 2: Strategy Pattern - Sorting Algorithms

// Demonstration
console.log("\n=== SORTING STRATEGY PATTERN ===\n");

// Test data
const numbers = [64, 34, 25, 12, 22, 11, 90, 5];
const words = ["banana", "apple", "cherry", "date", "elderberry", "fig"];

console.log("Original numbers:", numbers);
console.log("Original words:", words);

// Create sorter with default strategy
const sorter = new Sorter(new AscendingSort());

// Test different strategies on numbers
console.log("\n--- Sorting Numbers ---");
sorter.sort(numbers);
sorter.setStrategy(new DescendingSort());
sorter.sort(numbers);
sorter.setStrategy(new BubbleSort());
sorter.sort(numbers);
sorter.setStrategy(new SelectionSort());
sorter.sort(numbers);
sorter.setStrategy(new RandomSort());
sorter.sort(numbers);

// Test different strategies on strings
console.log("\n--- Sorting Strings ---");
sorter.setStrategy(new AscendingSort());
sorter.sort(words);
sorter.setStrategy(new DescendingSort());
sorter.sort(words);
sorter.setStrategy(new StringLengthSort());
sorter.sort(words);

// Advanced usage: Sorting objects
class ProductSortStrategy extends SortStrategy {
  constructor(key, direction = "asc") {
    super();
    this.key = key;
    this.direction = direction;
  }

  sort(data) {
    return [...data].sort((a, b) => {
      const valA = a[this.key];
      const valB = b[this.key];
      return this.direction === "asc"
        ? valA > valB
          ? 1
          : -1
        : valA < valB
          ? 1
          : -1;
    });
  }
}

const products_data = [
  { name: "Laptop", price: 999, rating: 4.5 },
  { name: "Mouse", price: 25, rating: 4.8 },
  { name: "Keyboard", price: 75, rating: 4.2 },
  { name: "Monitor", price: 299, rating: 4.6 },
];

console.log("\n--- Sorting Products ---");
const priceAsc = new ProductSortStrategy("price", "asc");
const priceDesc = new ProductSortStrategy("price", "desc");
const ratingAsc = new ProductSortStrategy("rating", "asc");
const ratingDesc = new ProductSortStrategy("rating", "desc");

sorter.setStrategy(priceAsc);
const sortedProducts = sorter.sort(products_data);
console.log("   Products by price (asc):");
sortedProducts.forEach((p) => console.log(`     ${p.name}: $${p.price}`));

sorter.setStrategy(ratingDesc);
const topRated = sorter.sort(products_data);
console.log("   Products by rating (desc):");
topRated.forEach((p) => console.log(`     ${p.name}: ${p.rating}★`));

// Task 3: Mediator Pattern - Chat System

// Demonstration
console.log("\n=== CHAT MEDIATOR PATTERN ===\n");

// Create mediator
const chatRoom = new ChatRoom();

// Create users
const alice = new ChatUser("Alice");
const bob = new ChatUser("Bob");
const charlie = new AdminUser("Charlie");
const bot = new BotUser("ChatBot");

// Add users to chat room
chatRoom.addUser(alice);
chatRoom.addUser(bob);
chatRoom.addUser(charlie);
chatRoom.addUser(bot);

console.log("\n--- Regular Chat ---");
alice.send("Hello everyone!");
bob.send("Hi Alice!");
charlie.send("Welcome to the chat!");

console.log("\n--- Private Messaging ---");
alice.sendPrivate("Bob", "Did you finish the report?");
bob.sendPrivate("Alice", "Almost done!");

console.log("\n--- Admin Actions ---");
charlie.sendAnnouncement("System maintenance in 10 minutes");

console.log("\n--- Bot Interaction ---");
alice.send("Can someone help me?");
bob.send("I need help with my code");

console.log("\n--- User Leaves ---");
charlie.kickUser("Bob");

console.log("\n--- Chat History ---");
console.log("Message history:");
chatRoom.getChatHistory().forEach((msg, i) => {
  console.log(`  ${i + 1}. [${msg.timestamp}] ${msg.sender}: ${msg.message}`);
});

// Task 4: Iterator Pattern - Data Collections
// Demonstration
console.log("\n=== ITERATOR PATTERN ===\n");

// Test 1: Basic Array Iterator
console.log("--- Basic Array Iterator ---");
const numbersData = new NumberCollection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const iterator = numbersData.createIterator();

console.log("Sequential iteration:");
while (iterator.hasNext()) {
  console.log(`  ${iterator.next()}`);
}

// Test 2: Reverse Iterator
console.log("\n--- Reverse Iterator ---");
const reverseIterator = numbersData.createReverseIterator();
console.log("Reverse iteration:");
while (reverseIterator.hasNext()) {
  console.log(`  ${reverseIterator.next()}`);
}

// Test 3: Filtered Iterators
console.log("\n--- Filtered Iterators ---");
const evenIterator = numbersData.getEvenIterator();
console.log("Even numbers:");
while (evenIterator.hasNext()) {
  console.log(`  ${evenIterator.next()}`);
}

const oddIterator = numbersData.getOddIterator();
console.log("Odd numbers:");
while (oddIterator.hasNext()) {
  console.log(`  ${oddIterator.next()}`);
}

const greaterThanFive = numbersData.getGreaterThanIterator(5);
console.log("Numbers > 5:");
while (greaterThanFive.hasNext()) {
  console.log(`  ${greaterThanFive.next()}`);
}

// Test 4: ForEach method
console.log("\n--- ForEach Iterator ---");
const forEachIterator = numbersData.createIterator();
console.log("Using forEach:");
forEachIterator.forEach((num) => {
  console.log(`  Processing: ${num}`);
});

// Test 5: Linked List Iterator
console.log("\n--- Linked List Iterator ---");
const linkedList = new LinkedList();
linkedList.add("Apple").add("Banana").add("Cherry").add("Date");

const listIterator = linkedList.createIterator();
console.log("Linked List elements:");
while (listIterator.hasNext()) {
  console.log(`  ${listIterator.next()}`);
}

// Test 6: Multiple Iterators Simultaneously
console.log("\n--- Multiple Iterators ---");
const numbers2 = new NumberCollection([10, 20, 30, 40, 50]);
const iter1 = numbers2.createIterator();
const iter2 = numbers2.createReverseIterator();

console.log("Forward and reverse simultaneously:");
console.log("  Forward | Reverse");
while (iter1.hasNext() && iter2.hasNext()) {
  console.log(`    ${iter1.next()}     |   ${iter2.next()}`);
}

// Test 7: Reset Iterator
console.log("\n--- Reset Iterator ---");
const resetIterator = numbersData.createIterator();
console.log("First pass:");
console.log(`  ${resetIterator.next()}`);
console.log(`  ${resetIterator.next()}`);
resetIterator.reset();
console.log("After reset:");
console.log(`  ${resetIterator.next()}`);
console.log(`  ${resetIterator.next()}`);

// Test 8: Custom Iterator for Object Collection
class ProductCollection extends IterableCollection {
  constructor() {
    super();
    this.products = [];
  }

  add(product) {
    this.products.push(product);
  }

  createIterator() {
    return new ArrayIterator(this.products);
  }

  getPriceRangeIterator(min, max) {
    return new FilterIterator(
      new ArrayIterator(this.products),
      (product) => product.price >= min && product.price <= max,
    );
  }
}

console.log("\n--- Product Collection Iterator ---");
const productCollection = new ProductCollection();
productCollection.add({ name: "Laptop", price: 999 });
productCollection.add({ name: "Mouse", price: 25 });
productCollection.add({ name: "Keyboard", price: 75 });
productCollection.add({ name: "Monitor", price: 299 });
productCollection.add({ name: "Headphones", price: 150 });

const productIterator = productCollection.getPriceRangeIterator(50, 300);
console.log("Products between $50 and $300:");
while (productIterator.hasNext()) {
  const product = productIterator.next();
  console.log(`  ${product.name}: $${product.price}`);
}
