const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Get the JWT token from the request header
  const token = req.header("Authorization");

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  // Check token validity
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // If the token is valid, you can add the authenticated user to the request object
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
