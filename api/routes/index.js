var express = require("express");
var router = express.Router();
var lists = require("../model/list");
var Bear = require("../model/bar");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.all("/bear", (req, res, next) => {
  var name = req.body.name;
  Bear.create({ name: name }, function(err, doc) {
    if (err) {
      res.json({
        code: 400,
        result: ""
      });
    } else {
      res.json({ code: 200, result: "添加成功" });
    }
  });
});

router.all("/bearList", (req, res, next) => {
  Bear.find({}).exec((err, todolist) => {
    if (err) {
      res.json({ code: 404, result: "fail" });
    } else {
      res.json(todolist);
    }
  });
});

module.exports = router;
