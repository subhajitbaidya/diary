const { getUser } = require("../utils/jwt.js");
const userModel = require("../models/User.js");
// JWT Authentication Middleware
const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token", token);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = getUser(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
module.exports = {
  requireAuth,
};
