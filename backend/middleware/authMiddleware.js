const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET must be configured.");

// Helper: read token from cookie first, then from Authorization header
function readToken(req) {
  // cookie-parser must be enabled (you already have it in index.js)
  if (req.cookies && req.cookies.token) return req.cookies.token;

  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) return auth.split(" ")[1];

  return null;
}

const protect = async (req, res, next) => {
  let token = readToken(req);

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    if (user.status !== "Approved")
      return res
        .status(403)
        .json({
          message: "This account is not approved to access the application.",
        });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Super Admin") return next();
  return res
    .status(403)
    .json({ message: "Forbidden: Access is restricted to Super Admins." });
};

const isOrganizer = (req, res, next) => {
  if (req.user && req.user.role === "Organizer") return next();
  return res
    .status(403)
    .json({ message: "Forbidden: Access is restricted to Organizers." });
};

module.exports = { protect, isSuperAdmin, isOrganizer };
