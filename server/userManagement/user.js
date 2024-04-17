const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Define user schema
const schema = mongoose.Schema;
const UserSchema = new schema({
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  name: {
      type: String,
      required: true
  },
  phoneNumber: {
      type: String,
      required: true
  },
  address: {
      type: String,
      required: true
  },
  items_in_cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Array of product ids
  // Add more fields as needed
});

// Model for users
const UserModel = mongoose.model('Users', UserSchema);

// Route for login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw Error('Email not registered');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error('Incorrect password');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for signup
app.post('/signup', async (req, res) => {
    const { email, password, name, phoneNumber, address } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = await UserModel.create({ email, password: hashedPassword, name, phoneNumber, address });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/cart/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Add the product ID to the user's cart
    user.items_in_cart.push({ productId, quantity });
    await user.save();

    res.status(200).json({ message: 'Item added to cart successfully', user });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(400).json({ error: error.message });
  }
});

// Route for adding items to the user's cart

// Connect to MongoDB
mongoose.connect("mongodb+srv://thejasrao262003:Vtap2009@cluster0.il7emnf.mongodb.net/ecommerce?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5001, () => console.log("Server running"));
    }).catch((error) => {
        console.log(error);
    });
