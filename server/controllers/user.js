const userModel = require("../models/user.js");
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

    setUser(newUser);

    res.status(201).json(newUser);
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
    res.cookie("uid", token);
    res.status(201).json({ email: email, password: password });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  handleLogin,
  handleSignup,
};
