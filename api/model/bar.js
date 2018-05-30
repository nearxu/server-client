// new Schema生成一张表，
// mongoose.model(name,Schema)给表命名
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BearSchema = new Schema({
  name: String
});
module.exports = mongoose.model("Bear", BearSchema);
