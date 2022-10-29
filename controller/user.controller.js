const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const GetAll = async (req, res) => {
  const users = await UserModel.find().select("-password");

  res.status(200).json({ users });
};

const GetOne = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const Update = async (req, res) => {
  const { email } = req.params;
  const { nama_depan, nama_belakang, nohp, pw, provinsi, kota, alamat } =
    req.body;

  try {
    if (nama_depan) await UserModel.updateOne({ email }, { nama_depan });
    if (nama_belakang) await UserModel.updateOne({ email }, { nama_belakang });
    if (nohp) await UserModel.updateOne({ email }, { nohp });
    if (pw) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(pw, salt);
      await UserModel.updateOne({ email }, { password: hash });
    }
    if (provinsi) await UserModel.updateOne({ email }, { provinsi });
    if (kota) await UserModel.updateOne({ email }, { kota });
    if (alamat) await UserModel.updateOne({ email }, { alamat });

    const user = await UserModel.findOne({ email }).select("-password");

    res.status(200).json({ message: "update berhasil", user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "gagal update" });
  }
};

const Delete = async (req, res) => {
  const { email } = req.params;

  try {
    await UserModel.remove({ email });
    res.status(400).json({ message: "berhasil menghapus" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "gagal menghapus" });
  }
};

module.exports = { GetAll, GetOne, Update, Delete };
