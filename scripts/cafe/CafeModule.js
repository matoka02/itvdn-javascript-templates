"use strict";
// ============================================
// 2. Cafe Class (Singleton Pattern)
// ============================================

/**
 * Cafe singleton class
 * Ensures only one instance of the cafe exists throughout the application
 */
class Cafe {
  /**
   * Private constructor - use getInstance() instead
   * @private
   */
  constructor() {
    this.name = "CyberBionic Coffee";
    this.address = "19 Eugene Sverstyuk Str., 5 floor, Kyiv, Ukraine";
    this.phone = "0 800 750 312";
    this.email = "edu@cbsystematics.com";
    this.website = "www.edu.cbsystematics.com";

    this.menu = new Map();
    this.orders = [];
    this.employees = [];
    this.openingHours = "Mon-Fri: 8:00 - 20:00, Sat-Sun: 10:00 - 18:00";
    this.totalRevenue = 0;

    console.log(`🏢 ${this.name} initialized at ${this.address}`);
  }

  /**
   * Static method to get the singleton instance
   * @returns {Cafe} - The single cafe instance
   */
  static getInstance() {
    if (!Cafe.instance) {
      Cafe.instance = new Cafe();
    }
    return Cafe.instance;
  }

  /**
   * Add beverage to the cafe menu
   * @param {string} beverageId - Beverage ID
   * @param {Beverage} beverage - Beverage object
   */
  addToMenu(beverageId, beverage) {
    this.menu.set(beverageId, beverage);
    console.log(`✅ Added to menu: ${beverage.getInfo()}`);
  }

  /**
   * Remove beverage from the menu
   * @param {string} beverageId - Beverage ID
   */
  removeFromMenu(beverageId) {
    if (this.menu.has(beverageId)) {
      const beverage = this.menu.get(beverageId);
      this.menu.delete(beverageId);
      console.log(`❌ Removed from menu: ${beverage.name}`);
    }
  }

  /**
   * Display the entire menu
   */
  displayMenu() {
    console.log("\n" + "=".repeat(60));
    console.log(`📋 ${this.name} - MENU`);
    console.log("=".repeat(60));

    if (this.menu.size === 0) {
      console.log("Menu is empty. Add some beverages!");
    } else {
      // Group beverages by category
      const categories = new Map();

      this.menu.forEach((beverage, id) => {
        if (!categories.has(beverage.category)) {
          categories.set(beverage.category, []);
        }
        categories.get(beverage.category).push({ id, beverage });
      });

      // Display by category
      categories.forEach((items, category) => {
        console.log(`\n📌 ${category}:`);
        console.log("-".repeat(40));
        items.forEach(({ id, beverage }) => {
          const available = beverage.isAvailable ? "🟢" : "🔴";
          console.log(
            `   ${available} ${beverage.name} - $${beverage.price.toFixed(2)}`,
          );
        });
      });
    }
    console.log("=".repeat(60) + "\n");
  }

  /**
   * Place an order
   * @param {Array} items - Array of beverage objects
   * @returns {Object} - Order object
   */
  placeOrder(items) {
    const order = {
      id: "ORD_" + Date.now(),
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      timestamp: new Date(),
      status: "pending",
    };

    items.forEach((item) => {
      if (item.isAvailable) {
        order.items.push(item);
        order.subtotal += item.price;
        console.log(`   ✓ Added ${item.name} - $${item.price.toFixed(2)}`);
      } else {
        console.log(`   ✗ ${item.name} is currently unavailable`);
      }
    });

    order.tax = order.subtotal * 0.07; // 7% tax
    order.total = order.subtotal + order.tax;
    order.status = "confirmed";

    this.orders.push(order);
    this.totalRevenue += order.total;

    console.log("\n" + "-".repeat(40));
    console.log(`🧾 ORDER #${order.id}`);
    console.log("-".repeat(40));
    console.log(`Subtotal: $${order.subtotal.toFixed(2)}`);
    console.log(`Tax (7%): $${order.tax.toFixed(2)}`);
    console.log(`Total: $${order.total.toFixed(2)}`);
    console.log(`Status: ${order.status}`);
    console.log("-".repeat(40) + "\n");

    return order;
  }

  /**
   * Get cafe statistics
   */
  getStatistics() {
    console.log("\n" + "📊".repeat(15));
    console.log("📊 CAFE STATISTICS");
    console.log("📊".repeat(15));
    console.log(`Total orders: ${this.orders.length}`);
    console.log(`Total revenue: $${this.totalRevenue.toFixed(2)}`);
    console.log(`Menu items: ${this.menu.size}`);
    console.log(
      `Available beverages: ${Array.from(this.menu.values()).filter((b) => b.isAvailable).length}`,
    );
  }

  /**
   * Display cafe information
   */
  getInfo() {
    console.log("\n" + "🏪".repeat(15));
    console.log(`🏪 ${this.name}`);
    console.log("🏪".repeat(15));
    console.log(`📍 Address: ${this.address}`);
    console.log(`📞 Phone: ${this.phone}`);
    console.log(`📧 Email: ${this.email}`);
    console.log(`🌐 Website: ${this.website}`);
    console.log(`⏰ Hours: ${this.openingHours}`);
  }
};
export default Cafe;
