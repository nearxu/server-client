var express = require("express");
var router = express.Router();
var lists = require("../model/list");
var Bear = require("../model/bar");

var responseData;
router.use(function(req, res, next) {
  responseData = {
    code: 0,
    date: [],
    message: ""
  };
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/list", function(req, res) {
  res.send("hello express");
});

router.post("/bear", (req, res) => {
  var bear = new Bear();
  bear.name = req.body.name;
  bear.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "bear is create!!!" });
  });
});

router.get("/lists", (req, res, next) => {
  lists
    .find({})
    .sort({ data: -1 })
    .exec((err, todolist) => {
      if (err) {
        responseData.code = 400;
        responseData.data = [];
        res.json(responseData);
      } else {
        responseData.code = 200;
        responseData.data = todolist || [];
        res.json(responseData);
      }
    });
});

router.post("/addList", function(req, res, next) {
  var data = JSON.parse(req.query.data);
  lists.create(data, err => {
    if (err) {
      console.log(err);
    } else {
      responseData.code = 200;
      responseData.message = "添加成功";
    }
  });
});

module.exports = router;
