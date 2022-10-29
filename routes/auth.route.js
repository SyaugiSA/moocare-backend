const router = require("express").Router();
const passport = require("passport");
const {
  Login,
  Register,
  Email,
  LupaPassword,
} = require("../controller/auth.controller");

router.post("/login", Login);
router.post("/register", Register);
router.post("/email-check", Email);
router.post("/lupa-password", LupaPassword);

router.post(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);
router.post("/google/callback", (req, res, next) =>
  res.json({ message: "Login Berhasil" })
);

module.exports = router;
