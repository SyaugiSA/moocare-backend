const DatasetModel = require("../model/dataset.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const data = await DatasetModel.find();
  res.status(200).json({ status: true, message: "Daftar Data", data });
});

router.post("/", async (req, res) => {
  const { heartRate, gyroX, gyroY, gyroZ } = req.body;
  const data = new DatasetModel({ heartRate, gyroX, gyroY, gyroZ });
  data.save();

  res
    .status(201)
    .json({ status: true, message: "Berhasil Menambahkan Data", data });
});

module.exports = router;
