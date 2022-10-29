const router = require("express").Router();
const ClickModel = require("./../model/click.model");

router.post("/", async (req, res) => {
  const { x, y, width, height, click, location } = req.body;

  const data = new ClickModel({ x, y, width, height, click, location });
  data.save();
});

module.exports = router;
