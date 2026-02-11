"use strict";

// ============================================
// PaymentProcessor Class
// ============================================

/**
 * Handles payment processing
 */
export class PaymentProcessor {
  constructor() {
    this.paymentMethods = ["credit_card", "paypal", "bank_transfer", "crypto"];
    this.transactions = [];
  }

  /**
   * Process payment
   * @param {number} amount - Total amount to charge
   * @param {string} method - Payment method
   * @returns {Object} - Payment result
   */
  processPayment(amount, method = "credit_card") {
    console.log(
      `💳 Processing payment: $${amount.toFixed(2)} via ${method}...`,
    );

    if (!this.paymentMethods.includes(method)) {
      return {
        success: false,
        message: `Payment method '${method}' not supported`,
        transactionId: null,
      };
    }

    // Simulate payment processing
    if (amount <= 0) {
      return {
        success: false,
        message: "Invalid payment amount",
        transactionId: null,
      };
    }

    const transactionId =
      "TXN_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

    this.transactions.push({
      id: transactionId,
      amount,
      method,
      timestamp: new Date(),
      status: "completed",
    });

    console.log(`✅ Payment successful! Transaction ID: ${transactionId}`);

    return {
      success: true,
      message: "Payment processed successfully",
      transactionId,
    };
  }

  /**
   * Process refund
   * @param {string} transactionId - Original transaction ID
   * @returns {Object} - Refund result
   */
  processRefund(transactionId) {
    console.log(`💸 Processing refund for transaction: ${transactionId}...`);

    const transaction = this.transactions.find((t) => t.id === transactionId);

    if (!transaction) {
      return {
        success: false,
        message: "Transaction not found",
      };
    }

    if (transaction.status === "refunded") {
      return {
        success: false,
        message: "Transaction already refunded",
      };
    }

    transaction.status = "refunded";

    return {
      success: true,
      message: `Refund processed: $${transaction.amount.toFixed(2)}`,
      refundId: "REF_" + Date.now(),
    };
  }
}
