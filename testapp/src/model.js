

class User {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
}

class Message {
    constructor(sender, recipients, content, timestamp, id) {
        this.sender = sender;
        this.recipients = recipients;
        this.content = content;
        this.timestamp = timestamp;
        this.id = id;
    }
}