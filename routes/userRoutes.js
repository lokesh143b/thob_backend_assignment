const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/userController"); // Import controller functions

const authMiddleWare = require("../config/authMiddleware"); // Import auth middleware (if needed later)

const router = express.Router(); // Create an Express router instance

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", loginUser);

// Export the router to be used in the main app
module.exports = router;
