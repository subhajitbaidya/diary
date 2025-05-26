const userModel = require("../models/user.js");
// Soft check if user exists
async function CheckUser(req, res) {
  const user = req.user;
  console.log("Session auth hit. Cookies:", req.cookies);
  if (!user) return res.status(400).json({ error: "Not logged in" });

  try {
    const dbUser = await userModel.findById(user._id).select("-password");
    if (dbUser) {
      req.user = user;
    }
  } catch (error) {
    console.error("checkAuth error:", error);
  }

  res.status(200).json({ user: user });
}
module.exports = { CheckUser };
