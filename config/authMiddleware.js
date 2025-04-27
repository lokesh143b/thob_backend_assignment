const jwt = require("jsonwebtoken");

// Middleware to protect routes by verifying JWT token
const authMiddleware = (req, res, next) => {
  // Get the Authorization header (usually in the format "Bearer <token>")
  const authHeader = req.headers["authorization"];

  // Extract the token part from the header
  const token = authHeader && authHeader.split(" ")[1];

  // If there's no token, deny access
  if (!token) return res.status(401).json({ success: false, message: "Access Denied" });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the user ID from token payload in the request body for use in the next middleware or route
    req.userId = decoded.id;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an error response
   
    res.json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
