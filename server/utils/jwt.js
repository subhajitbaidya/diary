const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

module.exports = {
  getUser,
  setUser,
};
