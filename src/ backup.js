// server.js

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const PORT = 3000;

// Initialize app
const app = express();
app.use(express.json());

// Initialize database
mongoose.connect('mongodb://localhost:27017/nodeapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import models directory using require-dir lib
requireDir('./src/models');

// Routes
const routes = require('./src/routes');

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// routes.js
const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');

// Route
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

module.exports = routes;

// ProductController.js

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
  async index(req, res) {
    const products = await Product.find();

    return res.json(products);
  },

  async show(req, res) {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  },

  async store(req, res) {
    const product = await Product.create(req.body);
    return res.json(product);
  },

  async update(req, res) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(product);
  },

  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);

    return res.send();
  }
};

// model Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Product', ProductSchema);
