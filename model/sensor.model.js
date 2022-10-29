const { Schema, model } = require("mongoose");

const SensorScheema = new Schema({
  heartRate: { type: Number, default: 0 },
  time: { type: Number, default: Date.now },
  sapi: Number,
});

const SensorModel = model("Sensor", SensorScheema);

module.exports = SensorModel;
