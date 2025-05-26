const express = require("express");
const router = express.Router();
const { CheckUser } = require("../controllers/auth.js");
const { checkAuth } = require("../middlewares/auth.js");

router.get("/auth", checkAuth, CheckUser);

module.exports = router;
