const express = require("express");
const router = express.Router();
const { CheckUser } = require("../controllers/auth.js");
const { requireAuth } = require("../middlewares/auth.js");

router.get("/auth", requireAuth, CheckUser);

module.exports = router;
