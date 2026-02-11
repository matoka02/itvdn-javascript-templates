import { DiscountDecorator } from "./DiscountDecoratorModule.js";
// ============================================
// Concrete Decorators (Different Discount Types)
// ============================================

/**
 * Percentage discount decorator
 */
class PercentageDiscount extends DiscountDecorator {
  constructor(product, percent) {
    super(product);
    this.percent = percent;
    this.discountName = `${percent}% Off`;
  }

  getDescription() {
    return `${this.product.getDescription()} [${this.discountName}]`;
  }

  getPrice() {
    const originalPrice = this.product.getPrice();
    const discountedPrice = originalPrice * (1 - this.percent / 100);
    return Math.round(discountedPrice * 100) / 100; // Round to 2 decimals
  }

  getInfo() {
    const original = this.product.getPrice();
    const discounted = this.getPrice();
    const savings = (original - discounted).toFixed(2);

    return (
      `${this.product.getDescription()} - ` +
      `$${original.toFixed(2)} → $${discounted.toFixed(2)} ` +
      `[${this.percent}% OFF, Save $${savings}]`
    );
  }
}

/**
 * Fixed amount discount decorator
 */
class FixedAmountDiscount extends DiscountDecorator {
  constructor(product, amount) {
    super(product);
    this.amount = amount;
    this.discountName = `$${amount} Off`;
  }

  getDescription() {
    return `${this.product.getDescription()} [${this.discountName}]`;
  }

  getPrice() {
    const originalPrice = this.product.getPrice();
    const discountedPrice = Math.max(0, originalPrice - this.amount);
    return Math.round(discountedPrice * 100) / 100;
  }

  getInfo() {
    const original = this.product.getPrice();
    const discounted = this.getPrice();
    const savings = (original - discounted).toFixed(2);

    return (
      `${this.product.getDescription()} - ` +
      `$${original.toFixed(2)} → $${discounted.toFixed(2)} ` +
      `[$${this.amount} OFF, Save $${savings}]`
    );
  }
}

/**
 * Buy One Get One Free decorator
 */
class BuyOneGetOneFree extends DiscountDecorator {
  constructor(product) {
    super(product);
    this.discountName = "BOGO";
  }

  getDescription() {
    return `${this.product.getDescription()} [${this.discountName}]`;
  }

  getPrice() {
    // For BOGO, effectively 50% off for 2 items
    const originalPrice = this.product.getPrice();
    return originalPrice / 2;
  }

  getInfo() {
    const original = this.product.getPrice();
    const discounted = this.getPrice();

    return (
      `${this.product.getDescription()} - ` +
      `Buy One Get One Free ` +
      `($${original.toFixed(2)} each, average $${discounted.toFixed(2)})`
    );
  }
}

/**
 * Seasonal discount decorator
 */
class SeasonalDiscount extends DiscountDecorator {
  constructor(product, percent = 15, season = "Summer") {
    super(product);
    this.percent = percent;
    this.season = season;
    this.discountName = `${season} Sale ${percent}%`;
  }

  getDescription() {
    return `${this.product.getDescription()} [${this.discountName}]`;
  }

  getPrice() {
    const originalPrice = this.product.getPrice();
    const discountedPrice = originalPrice * (1 - this.percent / 100);
    return Math.round(discountedPrice * 100) / 100;
  }

  getInfo() {
    const original = this.product.getPrice();
    const discounted = this.getPrice();

    return (
      `${this.product.getDescription()} - ` +
      `$${original.toFixed(2)} → $${discounted.toFixed(2)} ` +
      `[${this.season} Sale: ${this.percent}% OFF]`
    );
  }
}

/**
 * Loyalty discount decorator
 */
class LoyaltyDiscount extends DiscountDecorator {
  constructor(product, tier = "Silver") {
    super(product);
    this.tier = tier;

    const discounts = {
      Bronze: 5,
      Silver: 10,
      Gold: 15,
      Platinum: 20,
    };

    this.percent = discounts[tier] || 10;
    this.discountName = `${tier} Member ${this.percent}%`;
  }

  getDescription() {
    return `${this.product.getDescription()} [${this.discountName}]`;
  }

  getPrice() {
    const originalPrice = this.product.getPrice();
    const discountedPrice = originalPrice * (1 - this.percent / 100);
    return Math.round(discountedPrice * 100) / 100;
  }

  getInfo() {
    const original = this.product.getPrice();
    const discounted = this.getPrice();

    return (
      `${this.product.getDescription()} - ` +
      `$${original.toFixed(2)} → $${discounted.toFixed(2)} ` +
      `[${this.tier} Loyalty: ${this.percent}% OFF]`
    );
  }
}
/**
 * Bundle discount decorator
 */
class BundleDiscount extends DiscountDecorator {
  constructor(product, bundleName = "Special Bundle", discountPercent = 20) {
    super(product);
    this.bundleName = bundleName;
    this.percent = discountPercent;
    this.discountName = `${bundleName} ${discountPercent}%`;
  }

  getDescription() {
    return `${this.product.getDescription()} [${this.discountName}]`;
  }

  getPrice() {
    const originalPrice = this.product.getPrice();
    const discountedPrice = originalPrice * (1 - this.percent / 100);
    return Math.round(discountedPrice * 100) / 100;
  }

  getInfo() {
    const original = this.product.getPrice();
    const discounted = this.getPrice();

    return (
      `${this.product.getDescription()} - ` +
      `$${original.toFixed(2)} → $${discounted.toFixed(2)} ` +
      `[${this.bundleName} Bundle: ${this.percent}% OFF]`
    );
  }
}

export {
  PercentageDiscount,
  FixedAmountDiscount,
  BuyOneGetOneFree,
  SeasonalDiscount,
  LoyaltyDiscount,
  BundleDiscount,
};
