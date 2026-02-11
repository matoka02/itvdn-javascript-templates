"use strict";
// ============================================
// ShippingManager Class
// ============================================

/**
 * Manages shipping and delivery
 */
export class ShippingManager {
  constructor() {
    this.shippingMethods = {
      standard: { cost: 5.99, days: 5 },
      express: { cost: 12.99, days: 2 },
      overnight: { cost: 24.99, days: 1 },
    };
    this.shipments = [];
  }

  /**
   * Calculate shipping cost
   * @param {Array} items - Order items
   * @param {string} method - Shipping method
   * @returns {Object} - Shipping cost and details
   */
  calculateShipping(items, method = "standard") {
    console.log(`🚚 Calculating shipping cost (${method})...`);

    if (!this.shippingMethods[method]) {
      method = "standard";
    }

    // Base cost
    let cost = this.shippingMethods[method].cost;

    // Additional cost based on number of items
    if (items.length > 3) {
      cost += (items.length - 3) * 2;
    }

    return {
      method,
      cost,
      estimatedDays: this.shippingMethods[method].days,
      trackingAvailable: true,
    };
  }

  /**
   * Create shipment
   * @param {Object} order - Order details
   * @param {Object} shippingDetails - Shipping details
   * @returns {Object} - Shipment tracking info
   */
  createShipment(order, shippingDetails) {
    console.log(`📫 Creating shipment for order: ${order.orderId}...`);

    const trackingNumber =
      "TRK_" +
      Date.now() +
      "_" +
      Math.random().toString(36).substr(2, 6).toUpperCase();

    const shipment = {
      trackingNumber,
      orderId: order.orderId,
      shippingMethod: shippingDetails.method,
      shippingCost: shippingDetails.cost,
      estimatedDelivery: new Date(
        Date.now() + shippingDetails.estimatedDays * 24 * 60 * 60 * 1000,
      ),
      status: "pending",
      items: order.items,
    };

    this.shipments.push(shipment);

    console.log(`✅ Shipment created! Tracking: ${trackingNumber}`);

    return shipment;
  }

  /**
   * Track shipment
   * @param {string} trackingNumber - Shipment tracking number
   * @returns {Object} - Tracking information
   */
  trackShipment(trackingNumber) {
    const shipment = this.shipments.find(
      (s) => s.trackingNumber === trackingNumber,
    );

    if (!shipment) {
      return {
        found: false,
        message: "Shipment not found",
      };
    }

    return {
      found: true,
      trackingNumber: shipment.trackingNumber,
      status: shipment.status,
      estimatedDelivery: shipment.estimatedDelivery,
      orderId: shipment.orderId,
    };
  }
}