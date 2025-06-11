
import jwt from 'jsonwebtoken';

// Middleware to check if user is authenticated
const auth = (req, res, next) => {
  const token = req.headers.authorization || req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // If using "Bearer <token>", split it
    const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded; // Attach user data to request
    next(); // Move to next middleware
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;
