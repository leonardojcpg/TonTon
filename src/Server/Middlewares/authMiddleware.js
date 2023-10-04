const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;


const authMiddleware = (req, res, next) => {
  // Check if the JWT token is present in the request headers
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify and decrypt the JWT token
    const decoded = jwt.verify(token, secretKey);

    // Add the decoded user to the request for later use
    req.user = decoded;
    next(); // continue to next route
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
