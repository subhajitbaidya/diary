const userModel = require("../models/User.js");
const { setUser } = require("../utils/jwt.js");

async function handleSignup(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password)
    return res.status(400).json({ error: "Enter email or password" });

  const userExists = await userModel.findOne({ email });
  if (userExists)
    return res.status(400).json({ error: "email already registered" });

  try {
    const newUser = await userModel.create({
      email,
      password,
    });

    const token = setUser(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.status(201).json({
      message: "User created successfully",
      email: newUser.email,
      token: token,
    });
  } catch (error) {
    throw new Error(error);
  }
}
async function handleLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await userModel.findOne({ email, password });
    if (!user)
      return res.status(400).json({ error: "Incorrect email or password" });

    const token = setUser(user);
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      email: user.email,
      token: token,
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  handleLogin,
  handleSignup,
};
