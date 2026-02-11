// ============================================
// Product Class (Base Component)
// ============================================

/**
 * Base Product class
 */
class Product {
  constructor(name, price, category = "General") {
    this.name = name;
    this.price = price;
    this.category = category;
    this.id = Date.now() + Math.random().toString(36).substr(2, 5);
  }

  /**
   * Get product description
   * @returns {string} - Product description
   */
  getDescription() {
    return `${this.name} (${this.category})`;
  }

  /**
   * Get product price
   * @returns {number} - Original price
   */
  getPrice() {
    return this.price;
  }

  /**
   * Get full product info
   * @returns {string} - Formatted product info
   */
  getInfo() {
    return `${this.getDescription()} - $${this.getPrice().toFixed(2)}`;
  }
}
export default Product;
