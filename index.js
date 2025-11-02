const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample data
let messages = [
    { id: 1, text: 'Hello, World!', timestamp: new Date() }
];

// GET endpoint to retrieve all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// POST endpoint to add a new message
app.post('/api/messages', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Message text is required' });
    }
    
    const newMessage = {
        id: messages.length + 1,
        text,
        timestamp: new Date()
    };
    
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

// Serve the client interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
