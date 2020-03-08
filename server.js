// server.js

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const PORT = 3000;

// Initialize app
const app = express();
app.use(express.json());
app.use(cors);

// Initialize database
mongoose.connect('mongodb://localhost:27017/nodeapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import models directory using require-dir lib
requireDir('./src/models');

// Set routes dir
app.use('/api', require('./src/routes'));

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
