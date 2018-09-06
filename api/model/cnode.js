var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sumSchema = new Schema({
  type: String,
  len: Number,
  views: Number,
  comment: Number,
  aver: Number
});

module.exports = mongoose.model("sum", sumSchema);
