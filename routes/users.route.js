const requireAuth = require("../middleware/authorization");
const {
  GetAll,
  GetOne,
  Update,
  Delete,
} = require("./../controller/user.controller");

const router = require("express").Router();

router.use(requireAuth);

router.get("/", GetAll);
router.get("/:email", GetOne);
router.patch("/:email", Update);
router.delete("/:email", Delete);

module.exports = router;
