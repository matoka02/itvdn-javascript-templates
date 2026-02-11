// Mediator Interface
class ChatMediator {
  sendMessage(user, message) {
    throw new Error("sendMessage() must be implemented");
  }

  addUser(user) {
    throw new Error("addUser() must be implemented");
  }
}

// Concrete Mediator
class ChatRoom extends ChatMediator {
  constructor() {
    super();
    this.users = [];
    this.messageHistory = [];
  }

  addUser(user) {
    this.users.push(user);
    user.setMediator(this);
    this.notifyAll(null, `📢 ${user.name} has joined the chat`);
  }

  removeUser(user) {
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
      this.notifyAll(null, `📢 ${user.name} has left the chat`);
    }
  }

  sendMessage(sender, message) {
    const timestamp = new Date().toLocaleTimeString();
    const formattedMessage = {
      sender: sender.name,
      message: message,
      timestamp: timestamp,
    };

    this.messageHistory.push(formattedMessage);
    this.notifyAll(sender, `💬 ${sender.name}: ${message}`);
  }

  notifyAll(sender, message) {
    this.users.forEach((user) => {
      if (user !== sender) {
        user.receive(message);
      }
    });
  }

  sendPrivateMessage(sender, recipientName, message) {
    const recipient = this.users.find((u) => u.name === recipientName);
    if (recipient) {
      recipient.receive(`🔒 Private from ${sender.name}: ${message}`);
      sender.receive(`🔒 Private to ${recipientName}: ${message}`);
    }
  }

  getChatHistory() {
    return this.messageHistory;
  }
}

// Colleague
class User {
  constructor(name) {
    this.name = name;
    this.mediator = null;
    this.notifications = [];
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  send(message) {
    console.log(`[${this.name} sends]: ${message}`);
    this.mediator.sendMessage(this, message);
  }

  sendPrivate(recipientName, message) {
    console.log(`[${this.name} sends private to ${recipientName}]: ${message}`);
    this.mediator.sendPrivateMessage(this, recipientName, message);
  }

  receive(message) {
    console.log(`[${this.name} receives]: ${message}`);
    this.notifications.push(message);
  }

  getNotifications() {
    return this.notifications;
  }
}

// Specialized colleagues
class AdminUser extends User {
  constructor(name) {
    super(name);
    this.role = "Admin";
  }

  sendAnnouncement(message) {
    console.log(`\n🔔 [ANNOUNCEMENT from ${this.name}]: ${message}`);
    this.mediator.notifyAll(this, `🔔 ANNOUNCEMENT: ${message}`);
  }

  kickUser(username) {
    const user = this.mediator.users.find((u) => u.name === username);
    if (user) {
      this.mediator.removeUser(user);
      console.log(`[${this.name} kicked ${username}]`);
    }
  }
}

class BotUser extends User {
  constructor(name) {
    super(name);
    this.responses = {
      hello: "Hi there!",
      help: "Available commands: /help, /time, /users",
      time: `Current time: ${new Date().toLocaleTimeString()}`,
      users: "I need to check the user list...",
    };
  }

  receive(message) {
    super.receive(message);

    // Auto-respond to certain keywords
    const lowerMessage = message.toLowerCase();
    for (const [keyword, response] of Object.entries(this.responses)) {
      if (lowerMessage.includes(keyword)) {
        setTimeout(() => {
          this.send(`🤖 ${response}`);
        }, 500);
        break;
      }
    }
  }
}

// Export for module usage
export { ChatRoom, User, AdminUser, BotUser };
