// Abstract class / interface for notification services
class NotificationService {
    sendNotification(user, message) {
        throw new Error('Method must be implemented by subclass');
    }
}

// Email Service implementation
class EmailService extends NotificationService {
    sendNotification(user, message) {
        console.log(`📧 EMAIL to ${user.email}: ${message}`);
        // In real application: actual email sending logic
        return true;
    }
}

// SMS Service implementation
class SMSService extends NotificationService {
    sendNotification(user, message) {
        console.log(`📱 SMS to ${user.phone}: ${message}`);
        // In real application: actual SMS sending logic
        return true;
    }
}

// User class
class User {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.notificationPreferences = [];
    }
    
    addPreference(service) {
        this.notificationPreferences.push(service);
        console.log(`✓ ${this.name} subscribed to ${service.constructor.name}`);
    }
    
    removePreference(service) {
        const index = this.notificationPreferences.indexOf(service);
        if (index > -1) {
            this.notificationPreferences.splice(index, 1);
            console.log(`✗ ${this.name} unsubscribed from ${service.constructor.name}`);
        }
    }
}

// Observer Pattern: Subject / Observable
class NotificationSystem {
    constructor() {
        this.users = new Map(); // userId -> User
        this.subscribers = new Map(); // service -> Set of users
        this.availableServices = new Map(); // serviceType -> serviceInstance
    }
    
    // Register available notification services
    registerService(serviceType, serviceInstance) {
        this.availableServices.set(serviceType, serviceInstance);
        this.subscribers.set(serviceInstance, new Set());
        console.log(`🔧 Service registered: ${serviceType}`);
    }
    
    // Add user to system
    registerUser(user) {
        this.users.set(user.id, user);
        console.log(`👤 User registered: ${user.name}`);
    }
    
    // Subscribe user to specific notification service
    subscribe(userId, serviceType) {
        const user = this.users.get(userId);
        const service = this.availableServices.get(serviceType);
        
        if (!user || !service) {
            console.log('❌ User or service not found');
            return false;
        }
        
        const subscribers = this.subscribers.get(service);
        subscribers.add(user);
        user.addPreference(service);
        return true;
    }
    
    // Unsubscribe user from specific notification service
    unsubscribe(userId, serviceType) {
        const user = this.users.get(userId);
        const service = this.availableServices.get(serviceType);
        
        if (!user || !service) {
            console.log('❌ User or service not found');
            return false;
        }
        
        const subscribers = this.subscribers.get(service);
        subscribers.delete(user);
        user.removePreference(service);
        return true;
    }
    
    // Send notification to all subscribers of specific service
    notifyAll(serviceType, message) {
        const service = this.availableServices.get(serviceType);
        
        if (!service) {
            console.log('❌ Service not found');
            return;
        }
        
        const subscribers = this.subscribers.get(service);
        console.log(`\n📢 Sending notification via ${serviceType} to ${subscribers.size} users:`);
        
        subscribers.forEach(user => {
            service.sendNotification(user, message);
        });
    }
    
    // Send notification to specific user across all their subscribed services
    notifyUser(userId, message) {
        const user = this.users.get(userId);
        
        if (!user) {
            console.log('❌ User not found');
            return;
        }
        
        console.log(`\n📢 Sending notification to ${user.name}:`);
        user.notificationPreferences.forEach(service => {
            service.sendNotification(user, message);
        });
    }
    
    // Send broadcast to all users through all their subscribed services
    broadcast(message) {
        console.log(`\n📢 BROADCAST to all users:`);
        this.users.forEach(user => {
            user.notificationPreferences.forEach(service => {
                service.sendNotification(user, message);
            });
        });
    }
    
    // Get system statistics
    getStats() {
        console.log('\n=== SYSTEM STATISTICS ===');
        console.log(`Total users: ${this.users.size}`);
        
        this.availableServices.forEach((service, type) => {
            const count = this.subscribers.get(service).size;
            console.log(`${type} subscribers: ${count}`);
        });
    }
}



// Export for module usage
export {
    NotificationSystem,
    NotificationService,
    EmailService,
    SMSService,
    User
};