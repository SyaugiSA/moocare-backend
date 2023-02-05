const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => jwt.sign({ _id }, process.env.SECRET);

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      const match = bcrypt.compareSync(password, user.password);
      if (!match)
        return res
          .status(400)
          .json({ status: false, message: "Password Salah" });

      const token = createToken(user._id);
      res
        .status(202)
        .json({ status: true, message: "Login Berhasil", token, email });
    } else {
      res.status(400).json({ status: false, message: "Email Tidak Ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Terjadi Kesalahan" });
  }
};

const Register = async (req, res) => {
  try {
    const {
      nama_depan,
      nama_belakang,
      email,
      nohp,
      password,
      provinsi,
      kota,
      alamat,
    } = req.body;

    if (!nama_depan || !nama_belakang || !nohp || !provinsi || !kota || !alamat)
      return res
        .status(400)
        .json({ status: false, message: "Data Tidak Lengkap" });

    const salt = bcrypt.genSaltSync(10);
    const pw = bcrypt.hashSync(password, salt);

    const user = await UserModel.find({ email });
    const noHpReady = await UserModel.find({ nohp });

    if (noHpReady.length > 0)
      return res
        .status(400)
        .json({ status: false, message: "No HP Telah Terdaftar" });

    if (user.length === 0) {
      var data = new UserModel({
        nama_depan,
        nama_belakang,
        email,
        nohp,
        password: pw,
        provinsi,
        kota,
        alamat,
      });
      data
        .save()
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }

    return res
      .status(201)
      .json({ status: true, message: "Registrasi Berhasil" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
};

const Email = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ status: false, message: "Email Telah Terdaftar" });
    return res
      .status(200)
      .json({ status: true, message: "Email Siap Digunakan" });
  } catch (e) {
    res.status(500).json({ status: false, message: "Terjadi Kesalahan" });
  }
};

const LupaPassword = () => {};

module.exports = { Login, Register, Email, LupaPassword };
