var express = require('express'),
    mongoose = require('mongoose'),
    app = express();

mongoose.connect(process.env.DB_URL, {useMongoClient: true});

app.set("view-engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
  res.render("home.ejs");
});

app.listen(process.env.PORT, function(){
  console.log("app started on port: " + process.env.PORT);
});
