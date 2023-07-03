require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const Initialize = require("./passport.config");
const passport = require("passport");
const session = require("express-session");
const { connect } = require("mongoose");
const path = require("path");

const indexRouter = require("./routes/index.route");
const usersRouter = require("./routes/users.route");
const authRouter = require("./routes/auth.route");
const clickRouter = require("./routes/click.route");
const deviceRouter = require("./routes/device.route");
const datasetRouter = require("./routes/dataset.route");

const app = express();
const config = { google: { clientId: "", secretId: "", callbackURL: "" } };
Initialize(passport, config);
connect(process.env.DB);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "/storage")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/auth", authRouter);
app.use("/click", clickRouter);
app.use("/device", deviceRouter);
app.use("/dataset", datasetRouter);

module.exports = app;
