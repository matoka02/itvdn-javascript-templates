// ============================================
// DiscountDecorator Base Class (Decorator)
// ============================================

/**
 * Base Decorator class for discounts
 */
export class DiscountDecorator {
  constructor(product) {
    this.product = product;
  }

  getDescription() {
    return this.product.getDescription();
  }

  getPrice() {
    return this.product.getPrice();
  }

  getInfo() {
    return `${this.getDescription()} - $${this.getPrice().toFixed(2)}`;
  }
}
