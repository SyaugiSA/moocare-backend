const router = require("express").Router();
const { Average, Post, Get } = require("../controller/click.controller");

router.get("/", Get);
router.post("/", Post);
router.get("/average", Average);

module.exports = router;
