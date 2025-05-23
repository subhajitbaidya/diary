async function handleSignup(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  res.status(201).json({ email: email, password: password });
}
async function handleLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  res.status(201).json({ email: email, password: password });
}

module.exports = {
  handleLogin,
  handleSignup,
};
