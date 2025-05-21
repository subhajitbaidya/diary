const express = require("express");
const router = express.Router();
const { getQuote } = require("../controllers/quotes.js");

router.get("/quotes", getQuote);

module.exports = router;
