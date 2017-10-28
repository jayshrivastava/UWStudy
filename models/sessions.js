var mongoose = require("mongoose");

var sessionSchema = mongoose.Schema({
  course: String,
  location: String,
  maxMembers: Number,
  building: String,
  room: Number,
  floor: Number,
  contact: String, 
  details: String,
  
  currentUsers: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        
      },
      username: String
    }],
  
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: undefined }
});

sessionSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Session", sessionSchema);
