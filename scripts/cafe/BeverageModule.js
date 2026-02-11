"use strict";
// ============================================
// 1. Beverage Class (Product)
// ============================================

/**
 * Beverage class representing drinks in the cafe
 * This is our product class that will be created by the factory
 */
export class Beverage {
  /**
   * Create a new beverage
   * @param {string} name - Name of the beverage
   * @param {number} price - Price in currency units
   * @param {string} category - Category (Coffee, Tea, Juice, etc.)
   * @param {boolean} isHot - Whether the beverage is hot or cold
   */
  constructor(name, price, category, isHot = true) {
    this.id = Beverage.generateId();
    this.name = name;
    this.price = price;
    this.category = category;
    this.isHot = isHot;
    this.createdAt = new Date();
    this.isAvailable = true;
  }

  /**
   * Static method to generate unique IDs
   * @returns {string} - Unique ID
   */
  static generateId() {
    return "BVRG_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get beverage information
   * @returns {string} - Formatted beverage information
   */
  getInfo() {
    const temperature = this.isHot ? "Hot" : "Cold";
    const availability = this.isAvailable
      ? "Available"
      : "Currently Unavailable";
    return `${this.name} | ${this.category} | ${temperature} | $${this.price.toFixed(2)} | ${availability}`;
  }

  /**
   * Apply discount to the beverage price
   * @param {number} discountPercent - Discount percentage (0-100)
   */
  applyDiscount(discountPercent) {
    if (discountPercent >= 0 && discountPercent <= 100) {
      this.price = this.price * (1 - discountPercent / 100);
      console.log(
        `Discount of ${discountPercent}% applied to ${this.name}. New price: $${this.price.toFixed(2)}`,
      );
    } else {
      console.log("Invalid discount percentage. Must be between 0 and 100.");
    }
  }

  /**
   * Toggle beverage availability
   */
  toggleAvailability() {
    this.isAvailable = !this.isAvailable;
    console.log(
      `${this.name} is now ${this.isAvailable ? "available" : "unavailable"}`,
    );
  }
}

