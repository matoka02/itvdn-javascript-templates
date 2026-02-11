"use strict";

import {
  EmailService,
  NotificationService,
  NotificationSystem,
  SMSService,
  User,
} from "./scripts/NotificationSystemModule.js";

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

// // ============ ADVANCED SCENARIO ============

// // Create additional service
// class PushNotificationService extends NotificationService {
//   sendNotification(user, message) {
//     console.log(`📲 PUSH to ${user.name}'s device: ${message}`);
//   }
// }

// // Register new service
// const pushService = new PushNotificationService();
// notificationSystem.registerService("PUSH", pushService);

// // Subscribe some users to push notifications
// notificationSystem.subscribe(2, "PUSH"); // Jane subscribes to push
// notificationSystem.subscribe(3, "PUSH"); // Bob subscribes to push

// // Send urgent notification through all channels
// console.log("\n=== URGENT NOTIFICATION ===");
// const urgentMessage = "⚠️ CRITICAL: System will be down in 10 minutes!";

// notificationSystem.users.forEach((user) => {
//   user.notificationPreferences.forEach((service) => {
//     service.sendNotification(user, urgentMessage);
//   });
// });

// Final statistics
notificationSystem.getStats();

