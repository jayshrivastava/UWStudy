var express       = require('express'),
    mongoose      = require('mongoose'),
    bodyParser    = require('body-parser'),
    LocalStrategy = require("passport-local"),
    passport      = require("passport"),
    methodOverride = require("method-override"),
    app           = express();
    
    // -- -- -- -- TODO -- -- -- -- 
    /*
     *  1. get auth working
     *  2. fix big anchor tag on login page
     *  3. Set leader & leader actions
     *
     */
     
var Session = require("./models/sessions.js"),
    User    = require("./models/user.js");
    
var authRoutes = require("./routes/auth.js"),
    groupRoutes = require("./routes/groups.js");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {useMongoClient: true});

// passport config
app.use(require("express-session")({
    secret: "anything",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use(authRoutes);
app.use("/groups", groupRoutes);

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
