const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3003;

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Replace with the origin of your frontend application
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/microservices", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Use cookie-parser middleware
app.use(cookieParser());

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  age: Number,
  address: String,
  password: String,
});

// Define user model
const User = mongoose.model("User", userSchema);

// Parse JSON request body
app.use(express.json());

// Route to add a new user
app.post("/addUser", async (req, res) => {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance with hashed password
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      age: req.body.age,
      address: req.body.address,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send the saved user as the response
    res.json(savedUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.cookie("userId", user._id, { httpOnly: true });

    res.status(200).json({ message: "Login successful", user });
    console.log("Login Successful");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});

app.get("/dashboard", async (req, res) => {
    console.log(req.cookies);
  const userId = req.cookies.userId;
  console.log(userId);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Error fetching user data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
