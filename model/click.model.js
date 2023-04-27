const { Schema, model } = require("mongoose");

const ClickScheema = new Schema({
  location: String,
  button: String,
  duration: Number,
});

const ClickModel = model("Click", ClickScheema);

module.exports = ClickModel;
