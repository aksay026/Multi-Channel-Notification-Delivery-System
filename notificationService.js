// notificationService.js
class NotificationService {
    constructor(channelManager) {
        this.channelManager = channelManager;
    }

    sendNotification(message, channels) {
        channels.forEach(channel => {
            this.channelManager.send(channel, message);
        });
    }
}

module.exports = NotificationService;

// channelManager.js
class ChannelManager {
    constructor() {
        this.channels = {};
    }

    register(channelName, channel) {
        this.channels[channelName] = channel;
    }

    send(channelName, message) {
        const channel = this.channels[channelName];
        if (!channel) {
            console.error(`Channel ${channelName} not found.`);
            return;
        }
        channel.send(message);
    }
}

module.exports = ChannelManager;

// pushChannel.js
class PushChannel {
    send(message) {
        console.log(`Sending push notification: ${message}`);
        // Implement actual push notification logic here
    }
}

module.exports = PushChannel;

// smsChannel.js
class SMSChannel {
    send(message) {
        console.log(`Sending SMS: ${message}`);
        // Implement actual SMS sending logic here
    }
}

module.exports = SMSChannel;

// emailChannel.js
class EmailChannel {
    send(message) {
        console.log(`Sending email: ${message}`);
        // Implement actual email sending logic here
    }
}

module.exports = EmailChannel;

// Usage
const NotificationService = require('./notificationService');
const ChannelManager = require('./channelManager');
const PushChannel = require('./pushChannel');
const SMSChannel = require('./smsChannel');
const EmailChannel = require('./emailChannel');

// Create instances of channels
const pushChannel = new PushChannel();
const smsChannel = new SMSChannel();
const emailChannel = new EmailChannel();

// Register channels with the channel manager
const channelManager = new ChannelManager();
channelManager.register('push', pushChannel);
channelManager.register('sms', smsChannel);
channelManager.register('email', emailChannel);

// Create an instance of the notification service
const notificationService = new NotificationService(channelManager);

// Send notifications
notificationService.sendNotification('Hello World!', ['push', 'sms', 'email']);
