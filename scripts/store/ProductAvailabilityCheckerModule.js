"use strict";

// ============================================
// ProductAvailabilityChecker Class
// ============================================

/**
 * Checks product availability in inventory
 */
export class ProductAvailabilityChecker {
  constructor() {
    this.inventory = new Map([
      ["Laptop", { price: 1200, stock: 5 }],
      ["Mouse", { price: 25, stock: 50 }],
      ["Keyboard", { price: 80, stock: 15 }],
      ["Monitor", { price: 350, stock: 8 }],
      ["Headphones", { price: 95, stock: 12 }],
      ["USB Cable", { price: 10, stock: 100 }],
      ["Webcam", { price: 65, stock: 0 }], // Out of stock
    ]);
  }

  /**
   * Check if product is in stock and has sufficient quantity
   * @param {string} productName - Name of the product
   * @param {number} quantity - Requested quantity
   * @returns {Object} - Availability status and product info
   */
  checkAvailability(productName, quantity = 1) {
    console.log(`🔍 Checking availability: ${productName} (x${quantity})...`);

    if (!this.inventory.has(productName)) {
      return {
        available: false,
        message: `Product '${productName}' not found`,
        product: null,
      };
    }

    const product = this.inventory.get(productName);
    const isAvailable = product.stock >= quantity;

    return {
      available: isAvailable,
      message: isAvailable
        ? `✓ ${productName} is available (${product.stock} in stock)`
        : `✗ ${productName} is out of stock or insufficient quantity`,
      product: {
        name: productName,
        price: product.price,
        stock: product.stock,
      },
    };
  }

  /**
   * Reserve product (reduce stock)
   * @param {string} productName - Name of the product
   * @param {number} quantity - Quantity to reserve
   * @returns {boolean} - Success status
   */
  reserveProduct(productName, quantity = 1) {
    if (!this.inventory.has(productName)) return false;

    const product = this.inventory.get(productName);
    if (product.stock < quantity) return false;

    product.stock -= quantity;
    console.log(
      `📦 Reserved ${quantity}x ${productName}. Remaining: ${product.stock}`,
    );
    return true;
  }
}