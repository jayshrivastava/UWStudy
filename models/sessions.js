var mongoose = require("mongoose");

var sessionSchema = mongoose.Schema({
  course: String,
  maxMembers: Number,
  currentMembers: Number,
  location: String,
  start: Number, //24 hour clock
  end: Number // 24 hour clock
});

module.exports = mongoose.model("Session", sessionSchema);
