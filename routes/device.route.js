const router = require("express").Router();
const {
  GetAll,
  GetOne,
  AddDevice,
  AddSensor,
  UpdateDevice,
  Delete,
} = require("../controller/device.controller");
const requireAurh = require("./../middleware/authorization");

router.use(requireAurh);

router.get("/", GetAll);
router.post("/", AddDevice);
router.get("/:id", GetOne);
router.patch("/:id", UpdateDevice);
router.post("/:id/sensor", AddSensor);
router.delete("/:id", Delete);

module.exports = router;
