var express = require('express'),
    mongoose = require('mongoose'),
    app = express();

var Session = require("./models/sessions.js");

mongoose.connect(process.env.DB_URL, {useMongoClient: true});

// res.render automatically looks in views directory,
// view engine means it expects all files to be of .ejs if no extension is specified
app.set("view engine", "ejs");
// stylesheet and scripts
app.use(express.static(__dirname + "/public"));

seedDB();

app.get("/", function(req, res){
  Session.find({}, function(err, foundSessions){
    if(!err){
      res.render("home", {foundSessions: foundSessions});
    }
  })
});

app.get("/create", function (req, res){
  res.render ("create");
});

app.listen(process.env.PORT, function(){
  console.log("app started on port: " + process.env.PORT);
});

function seedDB(){
  Session.create({
    course: "test",
    expireAt: Date.now() + 60000
  }, function(session, err){
    if(!err)
      console.log(session);
  });
}
