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

router.get("/average", async (req, res) => {
  const buttonList = await ClickModel.distinct("button");
  let data = [];

  buttonList.map(async (list) => {
    const dataList = await ClickModel.find({ button: list });
    let time = 0;
    let name = 0;

    dataList.map((val) => {
      time += val.time;
      name = val.button;
    });
    const average = time / dataList.length;

    data.push({ responden: dataList.length, name, average });
  });

  setTimeout(() => {
    console.log({ data });
    res.status(200).json({ status: true, message: "Click average", data });
  }, 1000);
});

module.exports = router;
