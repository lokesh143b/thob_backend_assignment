const express = require("express");
const {
  addFood,
  listFood,
  removeFood,
} = require("../controllers/foodController"); // Import food controller functions
const multer = require("multer"); // Middleware for handling file uploads
const authMiddleWare = require("../config/authMiddleware")

const router = express.Router(); // Create an Express router instance

// Image storage engine configuration for multer
const storage = multer.diskStorage({
  // Set destination folder for uploads
  destination: "uploads", // Make sure this folder exists in your project root
  // Define filename format (timestamp-originalname)
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the defined storage settings
const upload = multer({ storage });

// Route to add a new food item (with image upload)
router.post("/add",authMiddleWare,  upload.single("image"), addFood); 
// Example: POST request to localhost:4000/food/add

// Route to get the list of all food items
router.get("/list",authMiddleWare , listFood); 
// Example: GET request to localhost:4000/food/list

// Route to remove a food item by ID
router.post("/remove",authMiddleWare, removeFood); 
// Example: POST request to localhost:4000/food/remove

// Export the router to be used in the main app
module.exports = router;
