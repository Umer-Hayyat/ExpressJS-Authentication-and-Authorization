var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var authentication = require("./utils/authentication");

var app = express();


app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// attach custom variable, this probably would be a user after authentication
app.use(function (req, res, next) {

  if (req.path.indexOf("login") > -1) {
    next();
  } else {
    let authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    try {
      let jwt = authentication.checkIfUserVerified(authorization);

      if (jwt && !!jwt.sub) {
        res.locals.user = {
          name: jwt.sub,
          roles: jwt.roles,
        };

        next();
      } else {
        throw Error("JWT missing");
      }
    } catch {
      res.redirect("~/login");
    }
  }
});

app.use("/", authRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.send(createError(401, "user unauthorized"));
});

module.exports = app;
