var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var apiRouter = require("./api/api");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// additional packages
const mongoose = require("mongoose");
app.use(express.json());

//CORS
app.use(cors());

// MongoDB Connection
const dbURI = "mongodb://localhost:27017";
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);

module.exports = app;
