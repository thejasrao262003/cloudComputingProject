// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5002;

// Connect to MongoDB
mongoose.connect('mongodb+srv://thejasrao262003:Vtap2009@cluster0.il7emnf.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    productDetails: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImageURL: {
        type: String,
        required: true
    }
});

// Create a model for products using the schema
const Product = mongoose.model('Product', productSchema);

// Middleware for parsing JSON
app.use(express.json());

// Route for adding a new product
app.post('/products', async (req, res) => {
    try {
        const { productName, productDetails, price, productImageURL } = req.body;
        const product = new Product({
            productName,
            productDetails,
            price,
            productImageURL
        });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).send('Server error');
    }
});

// Route for fetching product details by ID
app.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).send('Server error');
    }
});

app.get('/products', async (req, res) => {
    try {
        const searchTerm = req.query.search;
        let query = {};

        if (searchTerm) {
            query = {
                $or: [
                    { productName: { $regex: searchTerm, $options: 'i' } },
                    { productDetails: { $regex: searchTerm, $options: 'i' } }
                ]
            };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
