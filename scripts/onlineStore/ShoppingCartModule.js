// ============================================
// ShoppingCart Class
// ============================================

/**
 * Shopping cart that can hold products with discounts
 */
class ShoppingCart {
  constructor() {
    this.items = [];
    this.customerTier = "Bronze";
  }

  /**
   * Add product to cart
   * @param {Product} product - Product to add
   * @param {number} quantity - Quantity
   */
  addItem(product, quantity = 1) {
    this.items.push({
      product,
      quantity,
      addedAt: new Date(),
    });
    console.log(`🛒 Added: ${product.getInfo()} x${quantity}`);
  }

  /**
   * Remove item from cart
   * @param {number} index - Item index
   */
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      const removed = this.items.splice(index, 1);
      console.log(`🗑️ Removed: ${removed[0].product.getDescription()}`);
    }
  }

  /**
   * Calculate cart total
   * @returns {number} - Total price
   */
  getTotal() {
    return this.items.reduce((sum, item) => {
      return sum + item.product.getPrice() * item.quantity;
    }, 0);
  }

  /**
   * Get cart summary
   * @returns {Object} - Cart summary
   */
  getSummary() {
    const subtotal = this.getTotal();
    const itemCount = this.items.reduce(
      (count, item) => count + item.quantity,
      0,
    );

    return {
      items: this.items.map((item) => ({
        description: item.product.getDescription(),
        price: item.product.getPrice(),
        quantity: item.quantity,
        total: item.product.getPrice() * item.quantity,
      })),
      subtotal,
      itemCount,
      uniqueItems: this.items.length,
    };
  }

  /**
   * Display cart contents
   */
  displayCart() {
    console.log("\n" + "🛒".repeat(20));
    console.log("🛒 SHOPPING CART");
    console.log("🛒".repeat(20));

    if (this.items.length === 0) {
      console.log("Cart is empty");
      return;
    }

    let total = 0;
    this.items.forEach((item, index) => {
      const price = item.product.getPrice();
      const itemTotal = price * item.quantity;
      total += itemTotal;

      console.log(
        `${index + 1}. ${item.product.getInfo()} x${item.quantity} = $${itemTotal.toFixed(2)}`,
      );
    });

    console.log("-".repeat(40));
    console.log(`TOTAL: $${total.toFixed(2)}`);
    console.log("🛒".repeat(20) + "\n");
  }

  /**
   * Clear cart
   */
  clear() {
    this.items = [];
    console.log("🗑️ Cart cleared");
  }
}

export default ShoppingCart;
