var express = require('express'),
    mongoose = require('mongoose'),
    app = express();

var port = 3000;

app.set("view-engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
  res.render("home.ejs");
});

app.listen(port, function(){
  console.log("app started on port: " + port);
});
