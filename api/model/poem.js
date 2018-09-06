var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PoemSchema = new Schema({
  content: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  }
});
module.exports = mongoose.model("poemModel", PoemSchema);