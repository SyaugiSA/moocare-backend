const { Schema, model } = require("mongoose");

const ClickScheema = new Schema({
  location: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  click: Number,
});

const ClickModel = model("Click", ClickScheema);

module.exports = ClickModel;
