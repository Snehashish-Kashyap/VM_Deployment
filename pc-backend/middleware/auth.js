import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey123";

// ✅ Auth middleware to protect routes
export function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  // Check Bearer token format
  if (scheme !== "Bearer" || !token || token === "undefined" || token === "null") {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // ✅ Attach decoded user to request
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please log in again." });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
}
