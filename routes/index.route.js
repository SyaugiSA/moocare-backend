const router = require("express").Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.status(200).json({ status: true, message: "Aplikasi Berjalan" });
});

module.exports = router;
