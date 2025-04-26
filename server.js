// Import necessary modules
const express = require("express"); // Import express framework for handling HTTP requests and routes
const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions
const dotenv = require("dotenv"); // Import dotenv to manage environment variables securely
const cors = require("cors"); // Import CORS to enable cross-origin requests
const bodyParser = require("body-parser"); // Import body-parser to parse incoming request bodies
const foodRoutes = require("./routes/foodRoutes"); // Import routes related to food CRUD operations
const userRoutes = require("./routes/userRoutes"); // Import routes related to user registration, login, etc.

dotenv.config(); // Load environment variables from the .env file
const app = express(); // Create an instance of an express application

// Middleware
app.use(express.json()); // Middleware to parse incoming JSON request bodies
app.use(bodyParser.json()); // Middleware to parse JSON data in the body of requests
app.use(cors()); // Enable cross-origin resource sharing (CORS) to allow requests from other domains
app.use("/images", express.static("uploads")); // Serve static files (images) from the "uploads" folder, e.g., localhost:4000/images/<image-name>

// Routes
app.use("/food", foodRoutes); // Register food-related routes under /food endpoint
app.use("/user", userRoutes); // Register user-related routes under /user endpoint

// Health Check Route
app.get("/", (req, res) => {
  res.send("API is working"); // Simple route to check if the server is running correctly
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI) // Connect to MongoDB using the URI from environment variables
  .then(() => console.log("MongoDB connected successfully")) // Log success message if connected
  .catch((err) => console.error("MongoDB connection failed:", err)); // Log error if connection fails

// Server
const PORT = process.env.PORT || 5000; // Define the port to listen on (either from environment or default to 5000)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server and log the port it's running on
