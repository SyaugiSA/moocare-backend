const router = require("express").Router();
const ClickModel = require("./../model/click.model");

router.post("/", async (req, res) => {
  const { button, pathName, time, username } = req.body;

  const data = new ClickModel({
    button,
    pathName,
    time,
    username,
  });
  data.save();
});

router.get("/", async (req, res) => {
  const data = await ClickModel.find();

  res.status(200).json({ data });
});

module.exports = router;
