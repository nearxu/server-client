var express = require("express");
var router = express.Router();
var lists = require("../model/list");
var Bear = require("../model/bar");
var User = require("../model/user");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// detail
router.post("/detail", (req, res, next) => {
  let date = req.body.date;
  Bear.findOne({ date: date }, function(err, doc) {
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

// update
/*
Model.update(conditions, doc, [options], [callback])
conditions：查询条件；doc：需要修改的数据，不能修改主键（_id）；options：控制选项；
callback：回调函数，返回的是受影响的行数。
multi (boolean)： 默认为false。是否更新多个查询记录。
*/
router.post("/update", (req, res, next) => {
  let content = req.body.content;
  let date = req.body.date;
  Bear.update(
    { date: date },
    { content: content },
    { multi: true },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ code: 200, msg: "更新成功" });
      }
    }
  );
});

// 添加一个
router.post("/bear", (req, res, next) => {
  let content = req.body.content;
  let date = req.body.date;
  Bear.create({ content, date }, function(err) {
    if (err) {
      res.json({
        code: 400,
        result: ""
      });
    } else {
      Bear.find({}, (err, todolist) => {
        if (err) {
          console.log(err);
        } else {
          res.json(todolist);
        }
      });
    }
  });
});

router.post("/delete", (req, res, next) => {
  let item = req.body.date;
  Bear.remove({ date: item }, function(err) {
    if (err) {
      res.json({
        code: 400,
        result: ""
      });
    } else {
      Bear.find({}, (err, todolist) => {
        if (err) {
          console.log(err);
        } else {
          res.json(todolist);
        }
      });
    }
  });
});

router.post("/lists", (req, res, next) => {
  let pageSize = req.body.pageSize;
  let pageIndex = req.body.pageIndex;
  Bear.find({})
    .skip(pageSize * (pageIndex - 1))
    .limit(pageSize)
    .sort({ date: -1 })
    .exec((err, todolist) => {
      if (err) {
        res.json({ code: 404, result: "fail" });
      } else {
        res.json(todolist);
      }
    });
});

// 获取列表
router.post("/bearList", (req, res, next) => {
  Bear.find({})
    .sort({ date: -1 })
    .exec((err, todolist) => {
      if (err) {
        res.json({ code: 404, result: "fail" });
      } else {
        res.json(todolist);
      }
    });
});

// 删除所有
router.post("/deleteAll", (req, res, next) => {
  Bear.remove({}, err => {
    if (err) {
      res.json({ code: 404, result: "fail" });
    } else {
      res.json([]);
    }
  });
});

// 注册
router.post("/register", (req, res, next) => {
  let name = req.body.name;
  let pwd = req.body.pwd;
  User.create({ name: name, pwd: pwd }, (err, doc) => {
    if (err) {
      res.json({
        code: 400,
        message: "pendding"
      });
    } else {
      res.json({ code: 200, result: "注册成功" });
    }
  });
});

// 登录
router.post("/login", (req, res, next) => {
  let name = req.body.name;
  let pwd = req.body.pwd;
  User.findOne({ name: name, pwd: pwd }, (err, doc) => {
    if (err) {
      res.json({
        code: 400,
        message: "pendding"
      });
    } else {
      res.json({ code: 200, result: "登录成功" });
    }
  });
});

module.exports = router;
