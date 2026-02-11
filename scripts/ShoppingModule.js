// Subject (Observable)
class ShoppingCart {
    constructor() {
        this.items = [];
        this.observers = [];
    }

    // Observer management
    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(action, item) {
        this.observers.forEach(observer => {
            observer.update(action, item, this.getTotal(), this.getItemCount());
        });
    }

    // Cart operations
    addItem(item) {
        this.items.push(item);
        this.notifyObservers('ADDED', item);
    }

    removeItem(itemId) {
        const index = this.items.findIndex(item => item.id === itemId);
        if (index !== -1) {
            const removedItem = this.items[index];
            this.items.splice(index, 1);
            this.notifyObservers('REMOVED', removedItem);
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    getItemCount() {
        return this.items.length;
    }

    clearCart() {
        this.items = [];
        this.notifyObservers('CLEARED', null);
    }
}

// Observers
class UserInterfaceObserver {
    constructor(name) {
        this.name = name;
    }

    update(action, item, total, count) {
        switch(action) {
            case 'ADDED':
                console.log(`🖥️ [${this.name}] UI Updated: ${item.name} added to cart. Total: $${total}`);
                break;
            case 'REMOVED':
                console.log(`🖥️ [${this.name}] UI Updated: ${item.name} removed from cart. Total: $${total}`);
                break;
            case 'CLEARED':
                console.log(`🖥️ [${this.name}] UI Updated: Cart cleared. Total: $0`);
                break;
        }
    }
}

class EmailNotificationObserver {
    constructor(email) {
        this.email = email;
    }

    update(action, item, total, count) {
        switch(action) {
            case 'ADDED':
                console.log(`📧 [EMAIL to ${this.email}] Item added: ${item.name} - $${item.price}`);
                break;
            case 'REMOVED':
                console.log(`📧 [EMAIL to ${this.email}] Item removed: ${item.name}`);
                break;
            case 'CLEARED':
                console.log(`📧 [EMAIL to ${this.email}] Your cart has been cleared`);
                break;
        }
    }
}

class DiscountObserver {
    constructor() {
        this.threshold = 100;
    }

    update(action, item, total, count) {
        if (total > this.threshold) {
            console.log(`🏷️ [DISCOUNT] You've spent $${total}! Free shipping applied!`);
        }
    }
}

class InventoryObserver {
    update(action, item, total, count) {
        if (action === 'ADDED') {
            console.log(`📦 [INVENTORY] Stock updated: ${item.name} - 1 unit reserved`);
        } else if (action === 'REMOVED') {
            console.log(`📦 [INVENTORY] Stock updated: ${item.name} - 1 unit returned`);
        }
    }
}

// Export for module usage
export {
  ShoppingCart,
  UserInterfaceObserver,
  EmailNotificationObserver,
  DiscountObserver,
  InventoryObserver,
};
