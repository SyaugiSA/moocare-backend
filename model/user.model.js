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
  google: { id: String, email: String, nama: String },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  return next();
});

UserSchema.methods.isMatch = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = model("User", UserSchema);

module.exports = UserModel;
