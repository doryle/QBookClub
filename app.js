const express = require('express'),
      app     = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      flash   = require('connect-flash'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      Book     = require("./models/book"),
      Comment     = require("./models/comment"),
      User     = require("./models/user"),
      methodOverride = require('method-override')
      // seedDB      = require('./seeds')

var commentRoutes    = require("./routes/comments"),
    indexRoutes = require("./routes/index"),
    otherRoutes      = require("./routes/other");

mongoose.connect('mongodb://localhost/bookclub', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); 

// seedDB();

//  PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I am sleepy",
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success"); 
    next();
});

app.use("/index/:id/comments", commentRoutes);
app.use("/index", indexRoutes);
app.use(otherRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
console.log("BOOK CLUB IS LIVE");
});      
    