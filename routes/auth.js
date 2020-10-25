var express = require("express");
var router = express.Router();
var authentication = require("../utils/authentication");

router.get("/GetToken", (req, res, next) => {
  res
    .status(200)
    .send(
      JSON.stringify({ accessToken: authentication.getSignedJWT(req.body) })
    );
  res.destroy();
});


module.exports = router;
