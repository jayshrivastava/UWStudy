var mongoose = require("mongoose");

var sessionSchema = mongoose.Schema({
  course: String,
  maxMembers: Number,
  currentMembers: Number,
  location: String,
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: undefined }
});

sessionSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Session", sessionSchema);
