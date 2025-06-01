const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();
require("dotenv").config();
const quote = require("./routes/quotes.js");
const diary = require("./routes/diary.js");
const cors = require("cors");
const { connectMongoDB } = require("./database/connect.js");
const userService = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const Session = require("./routes/auth.js");

app.use(
  cors({
    origin: "http://127.0.0.1:5503", // your frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/session", Session);
connectMongoDB()
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB error", err));
app.use(express.urlencoded({ extended: true }));
app.use("/user", userService);
app.use("/api", quote);
app.use("/api/diary", diary);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
