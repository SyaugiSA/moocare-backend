const { Schema, model } = require("mongoose");

const DatasetSchema = new Schema({
  heartRate: { type: Number, default: 0 },
  gyroX: {type:Number, default:0},
  gyroY: {type:Number, default:0},
  gyroZ: {type:Number, default:0},
});

const DatasetModel = model("Dataset", DatasetSchema);

module.exports = DatasetModel;
