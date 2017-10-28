var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    Session = require("../models/sessions.js"),
    User    = require("../models/user");

router.get("/", function(req, res){
  Session.find({}, function(err, foundSessions){
    if(!err){
      res.render("sessions/show", { foundSessions: foundSessions });
    }
  });
});

router.get("/create", function(req, res){
  res.render("sessions/create");
});

router.post("/:id/join", function(req, res){
  var user = req.user;
  if(!user){
    res.redirect("/login");
  }
  
  user.save(function(err){
    if(!err){
      Session.findById(req.params.id, function(err, session){
        if(!err){
          session.currentUsers.push(user);
          session.save();
          Session.populate(session, {path: "currentUsers"});
          user.currentGroup = session._id; // save the session object id under currentGroup for the current user
          User.populate(user, {path: "currentGroup"}); // 'populate' the sessions' object id (aka find the corresponding session and replace the object id with actual data)
        }
      })
    }
  });
  // TODO redirect to group SHOW page with all group info nicely displayed
    res.redirect("/groups");
});

router.post("/create", function (req, res){
  if(req.user)
    var author = {
        id: req.user._id,
        username: req.user.username
    };
  var session = {course: req.body.course, author: author, building: req.body.building, maxMembers: req.body.size,  floor: req.body.floor, room: req.body.room,  expireAt: Date.now() + (req.body.duration*60*1000) }
  Session.create(session, function(err, session){
    if(!err){
      res.redirect("/groups");
    }
  });
});

module.exports = router;