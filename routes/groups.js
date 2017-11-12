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

// joining group logic
router.post("/:id/join", function(req, res){
  var user = req.user;
  if(!user){
    res.redirect("/login");
  }

  if(!user.inGroup){ //if user is not currently in a group
    Session.findById(req.params.id, function(err, session){ //find the group they clicked on
      if(!err){
        session.currentUsers.push(user); //add the current user to the group's users
        session.save(); // save the group information
        Session.populate(session, {path: "currentUsers"});
        user.currentGroup = session._id; // save the session object id under currentGroup for the current user
        User.populate(user, {path: "currentGroup"}); // 'populate' the sessions' object id (aka find the corresponding session and replace the object id with actual data)
        user.inGroup = true; // set the user to be currently in a group
        user.save();
        setTimeout(function(){
          console.log(user);
        }, 1000);
      }
    });
  } else {
    console.log("user is already in group " + user.currentGroup);
  }
  
  // TODO redirect to group SHOW page with all group info nicely displayed
    res.redirect("/groups");
});

// leave group route
router.get("/leave", function(req, res){
  var user = req.user;
  
  Session.findById(user.currentGroup.toString(), function(err, session){
    if(!err){
      for(var i = 0; i < session.currentUsers.length; i++){
        if(session.currentUsers[i]._id.toString() == user._id.toString()){ // find index of user in array
          session.currentUsers.splice(i, 1); // remove user from array
        }
      }
      session.save();
    }
  });
  
  user.inGroup = false;       //
  user.currentGroup = null;   // this part works
  user.save();                //
  
  res.redirect("/groups");
})

router.post("/create", function (req, res){
  if(req.user)
    var author = {
        id: req.user._id,
        username: req.user.username
    };
  var session = {course: req.body.course, author: author, building: req.body.building, maxMembers: req.body.size,  floor: req.body.floor, room: req.body.room, details: req.body.details, expireAt: Date.now() + (req.body.duration*60*1000) }
  Session.create(session, function(err, session){
    if(!err){
      res.redirect("/groups");
    }
  });
});

module.exports = router;