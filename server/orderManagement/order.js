// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(cors()); // Enable CORS
const PORT = process.env.PORT || 5003;

// Connect to MongoDB
mongoose.connect('mongodb+srv://thejasrao262003:Vtap2009@cluster0.il7emnf.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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

// Define cart schema
const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        productName: String
    }]
});

// Create Order and Cart models
const Order = mongoose.model('Order', orderSchema);
const Cart = mongoose.model('Cart', cartSchema);

// Route for fetching all orders
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

// Route for adding a product to the cart
app.post('/cart/add', async (req, res) => {
    try {
        const { productId, productName, userEmail } = req.body;
        const cart = await Cart.findOne({ userEmail });

        if (cart) {
            cart.items.push({ productId, productName });
            await cart.save();
            res.status(200).send('Product added to cart successfully');
        } else {
            const newCart = new Cart({
                userEmail,
                items: [{ productId, productName }]
            });
            await newCart.save();
            res.status(200).send('Product added to cart successfully');
        }
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Server error');
    }
});
app.get('/cart/:userEmail', async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        const cart = await Cart.findOne({ userEmail });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        res.json(cart.items);
    } catch (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).send('Server error');
    }
});
app.get("/", async (req, res)=>{
    res.status(200).send("Server has started");
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
