const DatasetModel = require("../model/dataset.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const data = await DatasetModel.find();
  res.status(200).json({ status: true, message: "Daftar Data Training", data });
});

router.post("/", async (req, res) => {
  const { heartRate } = req.body;
  const hr = Number(heartRate);
  const data = new DatasetModel({ heartRate: hr });
  data.save();

  console.log({ heartRate: hr });

  res
    .status(201)
    .json({ status: true, message: "Berhasil Menambahkan Data", data });
});

module.exports = router;
