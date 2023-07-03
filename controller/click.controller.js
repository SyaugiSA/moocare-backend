const ClickModel = require("./../model/click.model");
const path = require("path");
const xlsx = require("xlsx");

const Get = async (req, res) => {
  const data = await ClickModel.find();

  res.status(200).json({ data });
};

const Post = async (req, res) => {
  try {
    const { button, pathName, time, username } = req.body;

    const data = await new ClickModel({
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

const Download = async (req, res) => {
  const model = await ClickModel.find().select(["-_id", "-__v"]);
  const data = [];
  model.map((val) =>
    data.push({
      username: val.username,
      button: val.button,
      time: val.time,
      pathName: val.pathName,
    })
  );

  const workSheet = xlsx.utils.json_to_sheet(data);
  const workBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workBook, workSheet);
  xlsx.writeFile(
    workBook,
    path.join(__dirname, "../public/storage/click.xlsx")
  );
  console.log("file created");

  res.setHeader("Content-disposition", "attachment;filename=click.xlsx");
  res.setHeader("Content-type", "application/vnd.ms-excel");

  res.download(path.join(__dirname, "../public/storage/click.xlsx"), (err) => {
    if (err) console.log(err);
    else console.log("file downloaded");
  });
};

module.exports = { Get, Post, Average, Download };
