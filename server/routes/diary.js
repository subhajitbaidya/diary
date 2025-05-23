const express = require("express");
const router = express.Router();
const { handleDiaryText } = require("../controllers/diary.js");

router.post("/text", handleDiaryText);

module.exports = router;
