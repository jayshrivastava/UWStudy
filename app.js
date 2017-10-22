var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();


//test git commit from jay
var Session = require("./models/sessions.js");

mongoose.connect(process.env.DB_URL, {useMongoClient: true});

// res.render automatically looks in views directory,
// view engine means it expects all files to be of .ejs if no extension is specified
app.set("view engine", "ejs");
// stylesheet and scripts
app.use(express.static(__dirname + "/public"));
//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// seedDB();

app.get("/", function(req, res){
    res.render("home");
});

app.get("/groups", function(req, res){
  Session.find({}, function(err, foundSessions){
    if(!err){
      res.render("show", {foundSessions: foundSessions});
    }
  });
});

app.get("/create", function (req, res){
  res.render ("create");
});

app.post("/create", function (req, res){
  var session = {course: req.body.course, expireAt: Date.now() + (req.body.duration*60*1000)}

  Session.create(session, function(err, session){
    if(!err){
      res.redirect("/groups");
    }
  });
});

// Catch-all route
app.get("*", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("app started on port: " + process.env.PORT);
  console.log("url: uwstudy-damianreiter.c9users.io/");
});

function seedDB(){
  Session.create({
    course: "test",
    expireAt: Date.now() + (60*1000)
  }, function(session, err){
    if(!err)
      console.log(session);
  });
}
