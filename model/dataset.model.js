const { Schema, model } = require("mongoose");

const DatasetSchema = new Schema({
  heartRate: { type: Number, default: 0 },
  status: { type: String },
});

const DatasetModel = model("Dataset", DatasetSchema);

module.exports = DatasetModel;
