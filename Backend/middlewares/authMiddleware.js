import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach payload to request
    next(); // pass control to the next handler
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

export default verifyToken;
