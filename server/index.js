const express = require("express");
const PORT = 8000;
const app = express();
const quote = require("./routes/quotes.js");
const cors = require("cors");

app.use(cors());
app.use("/api", quote);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
