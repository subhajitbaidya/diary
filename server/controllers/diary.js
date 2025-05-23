const UserTextModel = require("../models/diary");

async function handleDiaryText(req, res) {
  const { text } = req.body;

  if (!text) return res.status(400).json("missing text");

  try {
    const UserText = await UserTextModel.create({
      text: text,
    });
    res.status(201).json({ message: UserText });
  } catch (error) {
    res.status(400).json("failed to insert into database!");
  }
}

module.exports = {
  handleDiaryText,
};
