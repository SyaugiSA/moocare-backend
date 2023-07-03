const router = require("express").Router();
const {
  Average,
  Post,
  Get,
  Download,
} = require("../controller/click.controller");

router.get("/", Get);
router.post("/", Post);
router.get("/average", Average);
router.get("/download", Download);

module.exports = router;
