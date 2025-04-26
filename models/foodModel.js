const mongoose = require("mongoose");

// Define the schema for food items
const foodSchema = new mongoose.Schema({
  // Name of the food item - required
  name: { type: String, required: true },

  // Description of the food item - required
  description: { type: String, required: true },

  // Price of the food item - required
  price: { type: Number, required: true },

  // Filename of the uploaded image - required
  image: { type: String, required: true },

  // Category of the food item - required and must match one of the listed options
  category: {
    type: String,
    enum: [
      "Salad",
      "Rolls",
      "Deserts",
      "Sandwitch", 
      "Cake",
      "Pure Veg",
      "Pasta",
      "Noodles",
      "Drinks",
      "Milkshakes",
    ],
    required: true,
  },
});

// Export the model (supports hot-reloading with || mongoose.models.Food)
module.exports = mongoose.model("Food", foodSchema) || mongoose.models.Food;
