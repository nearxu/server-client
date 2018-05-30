var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  }
});

var listModel = mongoose.model("listModel", listSchema);
module.exports = listModel;
