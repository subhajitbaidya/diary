const { getUser } = require("../utils/jwt.js");

function authenticateUser(req, res, next) {
  const token = req.cookies.uid;
  if (!token) return res.status(400).json({ error: "Unauthorized" });

  const user = getUser(token);
  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);

  req.user = user || null;
  next();
}

module.exports = { authenticateUser, checkAuth };
