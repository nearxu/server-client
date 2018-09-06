var express = require("express");
var router = express.Router();
var poems = require("../model/poem");

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/list", (req, res, next) => {
  poems.find({}, function(err, doc) {
    if (err) {
      res.json({
        code: 400,
        result: ""
      });
    } else {
      res.json(doc);
    }
  });
});

module.exports = router;
