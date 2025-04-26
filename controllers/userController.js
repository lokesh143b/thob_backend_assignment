const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input fields
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if a user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login a user using email or phone number
const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Validate input fields
    if (!emailOrPhone || !password) {
      return res.status(400).json({ success: false, message: "Email/Phone and password are required" });
    }

    const cleanedInput = emailOrPhone.trim(); // Safe to trim now

    let user;

    // Check if input is a phone number
    if (/^\d{10}$/.test(cleanedInput)) {
      user = await User.findOne({ phone: cleanedInput });
    }
    // Check if input is an email
    else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedInput)) {
      user = await User.findOne({ email: cleanedInput });
    }
    else {
      return res.status(400).json({ success: false, message: "Invalid email or phone format" });
    }

    // If user not found
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Successful login response
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




// Export all controller functions
module.exports = {
  registerUser,
  loginUser,
 
};
