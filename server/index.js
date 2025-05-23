const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();
require("dotenv").config();
const quote = require("./routes/quotes.js");
const diary = require("./routes/diary.js");
const cors = require("cors");
const { connectMongoDB } = require("./database/connect.js");

app.use(cors());
app.use(express.json());
connectMongoDB()
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB error", error));
app.use(express.urlencoded({ extended: true }));
app.use("/api", quote);
app.use("/api/diary", diary);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
