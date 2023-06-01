const ClickModel = require("./../model/click.model");

const Get = async (req, res) => {
  const data = await ClickModel.find();

  res.status(200).json({ data });
};

const Post = async (req, res) => {
  try {
    const { button, pathName, time, username } = req.body;

    const data = new ClickModel({
      button,
      pathName,
      time,
      username,
    });
    await data.save();
    console.log(data);
    res.status(200).json({ message: "click saved", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "click cannot saved", err });
  }
};

const Average = async (req, res) => {
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
};

module.exports = { Get, Post, Average };
