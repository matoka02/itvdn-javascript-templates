"use strict";

import { PaymentProcessor } from "./PaymentProcessorModule.js";
import { ProductAvailabilityChecker } from "./ProductAvailabilityCheckerModule.js";
import { ShippingManager } from "./ShippingManagerModule.js";

// ============================================
// OrderFacade Class (Facade Pattern)
// ============================================

/**
 * Facade that simplifies the ordering process
 * Hides complexity of availability checking, payment, and shipping
 */
class OrderFacade {
  constructor() {
    this.availabilityChecker = new ProductAvailabilityChecker();
    this.paymentProcessor = new PaymentProcessor();
    this.shippingManager = new ShippingManager();
    this.orders = [];
  }
  /**
   * Static factory method - creates instance and places order
   */
  static placeOrder(items, paymentDetails, shippingDetails) {
    const instance = new OrderFacade();
    return instance.placeOrder(items, paymentDetails, shippingDetails);
  }

  /**
   * Place an order - simplified interface for complex subsystems
   * @param {Array} items - Array of {productName, quantity} objects
   * @param {Object} paymentDetails - Payment method and details
   * @param {Object} shippingDetails - Shipping method and address
   * @returns {Object} - Order result
   */
  placeOrder(items, paymentDetails, shippingDetails) {
    console.log("\n" + "=".repeat(60));
    console.log("🛒 PLACING NEW ORDER");
    console.log("=".repeat(60));

    // Step 1: Validate order
    if (!items || items.length === 0) {
      return {
        success: false,
        message: "Order must contain at least one item",
      };
    }

    // Step 2: Check availability for all items
    console.log("\n📦 STEP 1: Checking product availability...");
    const availableItems = [];
    const unavailableItems = [];

    for (const item of items) {
      const availability = this.availabilityChecker.checkAvailability(
        item.productName,
        item.quantity || 1,
      );

      if (availability.available) {
        availableItems.push({
          ...item,
          price: availability.product.price,
        });
      } else {
        unavailableItems.push(item.productName);
      }
    }

    if (availableItems.length === 0) {
      return {
        success: false,
        message: "No items are available for purchase",
        unavailableItems,
      };
    }

    if (unavailableItems.length > 0) {
      console.log(
        `⚠️ Some items are unavailable: ${unavailableItems.join(", ")}`,
      );
    }

    // Step 3: Calculate total
    console.log("\n💰 STEP 2: Calculating order total...");
    let subtotal = 0;
    for (const item of availableItems) {
      const itemTotal = item.price * (item.quantity || 1);
      subtotal += itemTotal;
      console.log(
        `   ${item.productName} x${item.quantity || 1}: $${itemTotal.toFixed(2)}`,
      );
    }

    // Step 4: Calculate shipping
    console.log("\n🚚 STEP 3: Calculating shipping...");
    const shipping = this.shippingManager.calculateShipping(
      availableItems,
      shippingDetails?.method || "standard",
    );

    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping.cost + tax;

    console.log(`   Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`   Shipping: $${shipping.cost.toFixed(2)}`);
    console.log(`   Tax (8%): $${tax.toFixed(2)}`);
    console.log(`   Total: $${total.toFixed(2)}`);

    // Step 5: Process payment
    console.log("\n💳 STEP 4: Processing payment...");
    const payment = this.paymentProcessor.processPayment(
      total,
      paymentDetails?.method || "credit_card",
    );

    if (!payment.success) {
      return {
        success: false,
        message: `Payment failed: ${payment.message}`,
      };
    }

    // Step 6: Reserve products
    console.log("\n📦 STEP 5: Reserving products...");
    for (const item of availableItems) {
      this.availabilityChecker.reserveProduct(
        item.productName,
        item.quantity || 1,
      );
    }

    // Step 7: Create shipment
    console.log("\n📫 STEP 6: Creating shipment...");
    const orderId = "ORD_" + Date.now();
    const order = {
      orderId,
      items: availableItems,
      subtotal,
      tax,
      shipping,
      total,
      payment: {
        transactionId: payment.transactionId,
        method: paymentDetails?.method || "credit_card",
      },
      timestamp: new Date(),
      status: "confirmed",
    };

    const shipment = this.shippingManager.createShipment(order, shipping);
    order.trackingNumber = shipment.trackingNumber;
    order.status = "shipped";

    this.orders.push(order);

    // Step 8: Return order confirmation
    console.log("\n✅ ORDER PLACED SUCCESSFULLY!");
    console.log("=".repeat(60));

    return {
      success: true,
      message: "Order placed successfully",
      orderId: order.orderId,
      total: total,
      trackingNumber: shipment.trackingNumber,
      estimatedDelivery: shipment.estimatedDelivery,
      paymentTransactionId: payment.transactionId,
      unavailableItems: unavailableItems.length > 0 ? unavailableItems : null,
    };
  }

  /**
   * Get order status
   * @param {string} orderId - Order ID
   * @returns {Object} - Order status
   */
  getOrderStatus(orderId) {
    const order = this.orders.find((o) => o.orderId === orderId);

    if (!order) {
      return {
        found: false,
        message: "Order not found",
      };
    }

    return {
      found: true,
      orderId: order.orderId,
      status: order.status,
      total: order.total,
      items: order.items.length,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery,
    };
  }

  /**
   * Get all orders
   * @returns {Array} - List of orders
   */
  getAllOrders() {
    return this.orders;
  }
}
export default OrderFacade;
