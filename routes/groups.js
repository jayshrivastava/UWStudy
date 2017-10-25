var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    Session = require("../models/sessions.js"),
    User    = require("../models/user");

router.get("/", function(req, res){
  Session.find({}, function(err, foundSessions){
    if(!err){
      res.render("sessions/show", {foundSessions: foundSessions});
    }
  });
});

router.get("/create", function(req, res){
  res.render("sessions/create");
});

router.post("/create", function (req, res){
  var session = {course: req.body.course, building: req.body.building, maxMembers: req.body.size,  floor: req.body.floor, room: req.body.room,  expireAt: Date.now() + (req.body.duration*60*1000) }
  Session.create(session, function(err, session){
    if(!err){
      res.redirect("/groups");
    }
  });
});

module.exports = router;