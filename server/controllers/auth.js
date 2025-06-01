const userModel = require("../models/User.js");
const { getUser } = require("../utils/jwt.js");
// Soft check if user exists
async function CheckUser(req, res) {
  try {
    // Optionally fetch fresh user data from database
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}
module.exports = { CheckUser };
