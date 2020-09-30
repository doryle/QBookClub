var express = require("express");
var router  = express.Router();
var passport = require('passport');
var User = require('../models/user'); 


router.get('/', function(req, res){
    res.render("landing.ejs");
  });

  router.get('/register', function(req, res){
    res.render('register.ejs');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
      if(err || !user){
        req.flash("error", err.message);
        return res.redirect("/register");
      }
      passport.authenticate('local')(req, res, function(){
        req.flash("success", "Welcome to the quarantine book club " + user.username + "!");
        res.redirect('/index');
      });
    });
});

router.get('/login', function(req, res){
  res.render("login.ejs");
});

router.post('/login', passport.authenticate("local", 
 {
    successRedirect: "/index",
    failureRedirect: "/login"
}), function(req, res){

});

router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect('/index');
});
 
module.exports = router;
