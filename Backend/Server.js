// server.js
const express = require('express');
const app = express();
const PORT = 5000; // you can change this

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello, Express is running 🚀');
});

// Example API route
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is sample data from Express backend' });
});

// Post example
app.post('/api/echo', (req, res) => {
  res.json({ youSent: req.body });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
