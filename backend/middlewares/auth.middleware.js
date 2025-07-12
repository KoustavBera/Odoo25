import jwt from "jsonwebtoken";

/**
 * Auth middleware to protect routes using cookie-based JWT.
 */
export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { email, id, role }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

/**
 * Middleware to allow only admin users.
 * Assumes isAuth has already run and added req.user.
 */
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
