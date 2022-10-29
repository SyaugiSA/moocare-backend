const { Schema, model } = require("mongoose");

const DeviceScheema = new Schema({
  nama: { type: String, required: true },
  id: { type: Number, unique: true },
  user: { type: String, required: true },
  heartRate: { type: Number, default: 0 },
});

const DeviceModel = model("Device", DeviceScheema);

module.exports = DeviceModel;
