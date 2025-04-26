const foodModel = require("../models/foodModel");
const fs = require("fs");

// ====================
// Add a New Food Item
// ====================
const addFood = async (req, res) => {
  // Get uploaded image filename (if any)
  const image_filename = req.file?.filename;

  // Create a new food document
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    // Save to database
    await food.save();
    res.status(201).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Error saving food" });
  }
};

// ==========================
// Get List of All Food Items
// ==========================
const listFood = async (req, res) => {
  try {
    // Fetch all food items from database
    const foods = await foodModel.find({});

    // If no food items exist
    if (!foods.length) {
      return res.status(200).json({
        success: true,
        message: "No food items found",
        data: [],
      });
    }

    // Return food list
    res.status(200).json({
      success: true,
      message: "Food list fetched",
      data: foods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching list of food",
      error: error.message,
    });
  }
};

// ====================
// Remove a Food Item
// ====================
const removeFood = async (req, res) => {
  try {
    // Find the food item by ID
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // Delete associated image file from uploads folder
    fs.unlink(`uploads/${food.image}`, () => {});

    // Delete food item from database
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Item removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

module.exports = { addFood, listFood, removeFood };
