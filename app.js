var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

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
app.use((req, res, next) => {

  //by pass authentication and authorization on "GetToken"
  if (req.path.indexOf("GetToken") > -1) {
    next();
  } else {
    let authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    try {
      let jwt = null;

      //check if JWT is passed, validate it and throw error if validation fails.
      if (!!authorization)
        jwt = authentication.checkIfUserVerified(authorization);
      else
        throw Error("JWT is missing");


      if (jwt && !!jwt.sub) {
        res.locals.user = {
          name: jwt.sub,
          roles: jwt.roles,
        };

        next();
      } else {
        throw Error("User is unauthorized");
      }
    } catch (err) {
      throw err;
    }
  }
});

app.use("/", authRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.send(createError(401, err.message));
});

module.exports = app;
