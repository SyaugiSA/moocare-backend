const DatasetModel = require("./../model/dataset.model");
const xlsx = require("xlsx");

const Dataset = async () => {
  return {
    sehat: await DatasetModel.find({ status: "sehat" })
      .select(["-_id", "-__v"])
      .exec(),
    tidakSehat: await DatasetModel.find({ status: "tidak sehat" })
      .select(["-_id", "-__v"])
      .exec(),
  };
};

const addData = async (heartRate, status) => {
  return new DatasetModel({ heartRate, status }).save();
};

const Mean = async () => {
  const data = await Dataset();
  const ya = data.sehat.map((val) => val.heartRate);
  const sehat = ya.reduce((a, b) => a + b) / ya.length;
  const tidak = data.tidakSehat.map((val) => val.heartRate);
  const tidakSehat = tidak.reduce((a, b) => a + b) / tidak.length;

  return { sehat, tidakSehat };
};

const StandarDeviasi = async () => {
  const data = await Dataset();
  const mean = await Mean();
  const ya = data.sehat.map((val) => val.heartRate);
  const tidak = data.tidakSehat.map((val) => val.heartRate);
  let sum = 0;

  const sehat = () => {
    ya.map((val) => (sum += Math.pow(val - mean.sehat, 2)));
    return Math.sqrt(sum / (ya.length - 1));
  };

  const tidakSehat = () => {
    tidak.map((val) => (sum += Math.pow(val - mean.sehat, 2)));
    return Math.sqrt(sum / (tidak.length - 1));
  };

  return { sehat: sehat(), tidakSehat: tidakSehat() };
};

const Nilai = async (input) => {
  const mean = await Mean();
  const sd = await StandarDeviasi();

  let sehat =
    (1 / Math.sqrt(2 * Math.PI * sd.sehat)) *
    Math.exp(-(Math.pow(input - mean.sehat, 2) / (2 * Math.pow(sd.sehat, 2))));

  let tidakSehat =
    (1 / Math.sqrt(2 * Math.PI * sd.tidakSehat)) *
    Math.exp(
      -(Math.pow(input - mean.tidakSehat, 2) / (2 * Math.pow(sd.tidakSehat, 2)))
    );

  const status = sehat < tidakSehat ? "tidak sehat" : "sehat";

  await addData(input, status);
  return { sehat, tidakSehat, status, hr: input };
};

const AddDataset = () => {
  let { SheetNames, Sheets } = xlsx.readFile("./storage/dataset.xlsx");
  const jsonData = xlsx.utils.sheet_to_json(Sheets[SheetNames[0]]);

  return jsonData.map(async (val) => {
    const data = new DatasetModel({
      heartRate: val.HeartRate,
      status: val.status,
    });
    await data.save();
  });
};

const DataTraining = async () => {
  const { SheetNames, Sheets } = xlsx.readFile("./storage/dataset.xlsx");
  const jsonData = xlsx.utils.sheet_to_json(Sheets[SheetNames[1]]);
  // console.log(jsonData);

  return jsonData.map(async ({ HeartRate }) =>
    console.log(await Nilai(HeartRate))
  );
};

module.exports = { Nilai };
