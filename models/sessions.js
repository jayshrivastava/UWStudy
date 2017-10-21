var mongoose = require("mongoose");

var sessionSchema = mongoose.Schema({
  course: String,
  maxMembers: Number,
  currentMembers: Number,
  location: String
});

module.exports = mongoose.model("Session", sessionSchema);
