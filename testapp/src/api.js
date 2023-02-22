
const express = require('express');
const app = express();
const port = 3000;

const users = [
    { name: 'John', 
      email: 'john@example.com',
      id: 1
    },
    { name: 'James', 
      email: 'james@example.com',
      id: 2
    },
    { name: 'Thiago', 
      email: 'thiago@example.com',
      id: 3
    },
]

const messages = [
    {
        sender: 'John',
        recipients: ['James'],
        content: 'Hello, world',
        timestamp: '2017-01-01 00:00:00',
        id: 1
    },
    {
        sender: 'James',
        recipients: ['John', 'Thiago'],
        content: 'Hello, world ---',
        timestamp: '2017-01-03 00:00:00',
        id: 2
    }
]

// Apis
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

app.post('/users', express.json(), (req, res) => {
    const { name, email } = req.body;
    const id = users.lenght + 1;
    const newUser = { id, name, email };
    users.push(newUser);
    res.status(200).json(newUser);
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.get('/messages/:id', (req, res) => {
    const id = Number(req.params.id);
    const message = messages.find(message => message.id === id);
    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
});

app.post('/messages', express.json(), (req, res) => {
    const { sender, recipients, content } = req.body;
    const id = messages.lenght + 1;
    const timestamp = new Date().toISOString();

    const invalidRecipients = recipients.filter((recipientId) => { users.id === recipientId})
    if (invalidRecipients.length > 0) {
        return res.status(400).json({ error: `Invalid recipients: ${invalidRecip.join(', ')}`})
    }

    const newMessage = { id, sender, recipients, content, timestamp };
    messages.push(newMessage);
    res.status(200).json(newMessage);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});