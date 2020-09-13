var express = require("express");
var router = express.Router();


router.get("/all", function (req, res, next) {
  res.json([
    {
      id: 1,
      name: "John Smith",
    },
    {
      id: 2,
      name: "Fairy Saleena",
    }
  ]);
});



module.exports = router;
