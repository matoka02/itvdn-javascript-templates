"use strict";
import { Beverage } from "./BeverageModule.js";

class BeverageFactory {
  /**
   * Create a beverage based on the type and parameters
   * @param {string} type - Type of beverage to create
   * @param {Object} options - Beverage options
   * @returns {Beverage} - New beverage instance
   */
  static createBeverage(type, options = {}) {
    const { name, price, isHot = true, customCategory = null } = options;

    switch (type.toLowerCase()) {
      case "espresso":
        return new Beverage(
          name || "Espresso",
          price || 2.5,
          customCategory || "Coffee",
          isHot,
        );

      case "latte":
        return new Beverage(
          name || "Latte",
          price || 4.5,
          customCategory || "Coffee",
          isHot,
        );

      case "cappuccino":
        return new Beverage(
          name || "Cappuccino",
          price || 4.0,
          customCategory || "Coffee",
          isHot,
        );

      case "americano":
        return new Beverage(
          name || "Americano",
          price || 3.0,
          customCategory || "Coffee",
          isHot,
        );

      case "green tea":
        return new Beverage(
          name || "Green Tea",
          price || 2.8,
          customCategory || "Tea",
          isHot,
        );

      case "black tea":
        return new Beverage(
          name || "Black Tea",
          price || 2.5,
          customCategory || "Tea",
          isHot,
        );

      case "herbal tea":
        return new Beverage(
          name || "Herbal Tea",
          price || 3.2,
          customCategory || "Tea",
          isHot,
        );

      case "orange juice":
        return new Beverage(
          name || "Orange Juice",
          price || 3.5,
          customCategory || "Juice",
          false,
        );

      case "lemonade":
        return new Beverage(
          name || "Lemonade",
          price || 3.8,
          customCategory || "Juice",
          false,
        );

      case "smoothie":
        return new Beverage(
          name || "Berry Smoothie",
          price || 5.0,
          customCategory || "Smoothie",
          false,
        );

      case "hot chocolate":
        return new Beverage(
          name || "Hot Chocolate",
          price || 3.9,
          customCategory || "Dessert",
          true,
        );

      case "custom":
        return new Beverage(
          name || "Custom Beverage",
          price || 2.0,
          customCategory || "Other",
          isHot,
        );

      default:
        throw new Error(`Unknown beverage type: ${type}`);
    }
  }

  /**
   * Create multiple beverages at once
   * @param {Array} orders - Array of order objects
   * @returns {Array} - Array of beverage instances
   */
  static createMultipleBeverages(orders) {
    return orders.map((order) =>
      this.createBeverage(order.type, order.options),
    );
  }

  /**
   * Get available beverage types
   * @returns {Array} - List of available beverage types
   */
  static getAvailableTypes() {
    return [
      "espresso",
      "latte",
      "cappuccino",
      "americano",
      "green tea",
      "black tea",
      "herbal tea",
      "orange juice",
      "lemonade",
      "smoothie",
      "hot chocolate",
      "custom",
    ];
  }
}
export default BeverageFactory;
