var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User    = require("../models/user");
    
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/login", function(req, res){
  res.render("auth/login");
});

router.get("/signup", function(req, res){
  res.render("auth/signup");
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

router.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res){
    
});

router.post("/signup", function(req, res){
    var newUser = new User({
        username: req.body.username,
        email: req.body.email
    });
    
    User.register(newUser, req.body.password, function(err, user){
        if(!err){
            passport.authenticate('local', {
                successRedirect: "/",
                failureRedirect: "/groups/create",
            })(req, res, function(){
                console.log("authenticated " + user.username + "!");
            });
        }
    });
});

module.exports = router;