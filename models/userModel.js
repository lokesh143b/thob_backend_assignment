const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // User's name - required and must be unique
    name: { type: String, required: true, unique: true },

    // User's email - required and must be unique
    email: { type: String, required: true, unique: true },

    // Hashed password - required
    password: { type: String, required: true },

    // User's phone number - optional but must be unique if provided
    phone: { type: String, unique: true },

    // Timestamp when the user is created
    createdAt: { type: Date, default: Date.now },

  },
  {
    // Avoid auto-removal of empty objects
    minimize: false,

    // Automatically add `createdAt` and `updatedAt` timestamps
    timestamps: true,
  }
);

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
