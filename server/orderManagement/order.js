// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(cors()); // Enable CORS
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/microservices', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define order schema
const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    items: [{
        productName: String,
        quantity: Number,
        price: Number
    }],
    total: {
        type: Number,
        required: true
    }
});

// Create Order model
const Order = mongoose.model('Order', orderSchema);
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Server error');
    }
});
// Route for adding a new order
app.post('/orders', async (req, res) => {
    try {
        const { customerName, items, total } = req.body;
        const order = new Order({
            customerName,
            items,
            total
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        console.error('Error adding order:', err);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
