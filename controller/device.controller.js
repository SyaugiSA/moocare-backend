const DeviceModel = require("./../model/device.model");
const SensorModel = require("./../model/sensor.model");
const { Nilai } = require("./bayes.controller");

const GetAll = async (req, res) => {
  try {
    const user = req.user;
    const devices = await DeviceModel.find({ user: user._id });

    res.status(200).json({ status: true, message: "Daftar Device", devices });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: false, message: "Gagal Mendapatkan Device" });
  }
};

const GetOne = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const device = await DeviceModel.findOne({ user: user._id, id });
    const sensor = await SensorModel.find({ sapi: id });
    const data = {
      nama: device.nama,
      user: device.user,
      heartRate: await Nilai(device.heartRate),
      id: device.id,
    };

    res
      .status(200)
      .json({ status: true, message: "Device Anda", device: data, sensor });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: false, message: "Gagal Mendapatkan Device" });
  }
};

const AddDevice = async (req, res) => {
  try {
    const user = req.user;
    const { nama } = req.body;

    if (nama) {
      const id = (Math.random() * 10000).toFixed();
      const data = new DeviceModel({ nama, user: user._id, id });
      data.save();

      res
        .status(201)
        .json({ status: true, message: "Berhasil Menambahkan Device", data });
    } else
      res
        .status(400)
        .json({ status: false, message: "Gagal Menambahkan Device" });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: false, message: "Gagal Menambahkan Device" });
  }
};

const UpdateDevice = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { nama } = req.body;

    if (nama) {
      await DeviceModel.updateOne({ id, user: user._id }, { nama });
      res.status(200).json({ status: true, message: "Update Berhasil" });
    } else {
      res.status(400).json({ status: false, message: "Update Gagal" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Update Gagal" });
  }
};

const AddSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const { heartRate } = req.body;

    const device = await DeviceModel.findOne({ id });
    if (device) {
      const data = new SensorModel({ sapi: id, heartRate });
      data.save();

      await DeviceModel.updateOne({ id }, { heartRate });

      res
        .status(200)
        .json({ status: true, message: "Sensor Ditambahkan", data });
    } else {
      res
        .status(404)
        .json({ status: false, message: "Device tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gagal Menambah Sensor" });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    await DeviceModel.deleteOne({ id });
    await SensorModel.deleteMany({ sapi: id });

    res.status(200).json({ status: true, message: "Data Berhasil Dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Data Gagal Dihapus" });
  }
};

module.exports = {
  GetAll,
  GetOne,
  UpdateDevice,
  AddDevice,
  AddSensor,
  Delete,
};
