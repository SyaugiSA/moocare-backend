const UserModel = require("./../model/user.model");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res
        .status(401)
        .json({ status: false, message: "Anda Belum Login" });

    const token = authorization.split(" ")[1];

    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await UserModel.findById(_id).select("-password");
    next();
  } catch (err) {
    console.log(err);
    req.status(500).json({ status: false, message: "Terjadi Kesalahan" });
  }
};

module.exports = requireAuth;
