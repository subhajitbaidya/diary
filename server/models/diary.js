const mongoose = require("mongoose");
const UserText = new mongoose.Schema(
  {
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserTextModel = mongoose.model("entries", UserText);
module.exports = UserTextModel;
