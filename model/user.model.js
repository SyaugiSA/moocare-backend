const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  nama_depan: { type: String, required: true },
  nama_belakang: { type: String, required: true },
  email: { type: String, unique: true },
  nohp: { type: Number, required: true, unique: true },
  password: { type: String },
  provinsi: { type: Number, required: true },
  kota: { type: Number, required: true },
  alamat: { type: String, required: true },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
