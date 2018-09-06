var express = require("express");
var router = express.Router();
var sumCnode = require("../model/cnode");

router.get("/data", (req, res, err) => {
  sumCnode.find({}, function(err, doc) {
    if (err) {
      res.json({
        code: 400,
        result: "服务器繁忙"
      });
    } else {
      res.json({
        code: 200,
        success: true,
        data: doc
      });
    }
  });
});

module.exports = router;
