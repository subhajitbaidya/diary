const express = require("express");
const router = express.Router();
const { handleLogin, handleSignup } = require("../controllers/user.js");

router.post("/login", handleLogin);
router.post("/signup", handleLogin);

module.exports = router;
