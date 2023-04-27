const router = require("express").Router();
const ClickModel = require("./../model/click.model");

router.post("/", async (req, res) => {
  const { button, location, time } = req.body;

  const data = new ClickModel({
    button,
    location,
    duration: time,
  });
  data.save();
});

module.exports = router;
