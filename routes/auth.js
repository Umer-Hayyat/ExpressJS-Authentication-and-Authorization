var express = require("express");
var router = express.Router();
var authentication = require("../utils/authentication");

router.post("/login", (req, res, next) => {
  res
    .status(200)
    .send(
      JSON.stringify({ accessToken: authentication.getSignedJWT(req.body) })
    );
  res.destroy();
});

module.exports = router;
