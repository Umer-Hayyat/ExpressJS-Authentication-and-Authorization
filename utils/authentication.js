const jwt = require("jsonwebtoken");
const keyManager = require("./key-manager");
const { Roles } = require("./constants");

const payLoad = {
  roles: [Roles.MODERATOR, Roles.USER],
};

const key = keyManager.KEY;

let issuer = "localhost"; //issuer identity
let subject = "umer@localhost.com"; //entity being authorized, could be user name, email
let audience = "localhost"; //consumer identity, could be domain name
let expiresIn = "1h";
let algorithm = "HS256";

const signOptions = {
  issuer,
  subject,
  audience,
  expiresIn,
  algorithm,
};

getSignedJWT = (authObject) => {
  subject = authObject.user || subject;

  //password verfication is not done, below code only be executed after executing authentication business logic
  return jwt.sign(payLoad, key, signOptions);
};

checkIfUserVerified = (jwtToken) => {
  return jwt.verify(jwtToken, key, signOptions);
};

module.exports = { getSignedJWT, checkIfUserVerified };
