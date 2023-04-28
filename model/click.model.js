const { Schema, model } = require("mongoose");

const ClickScheema = new Schema({
  username: String,
  pathName: String,
  time: Number,
  button: String,
});

const ClickModel = model("Click", ClickScheema);

module.exports = ClickModel;
