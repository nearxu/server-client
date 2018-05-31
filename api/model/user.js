var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  pwd: {
    type: String,
    required: true
  }
});

var userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
