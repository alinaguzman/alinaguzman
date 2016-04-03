var express = require('express');
var router = express.Router();
var models = require("../models");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
    models.User.findById(id).then(function(user){
      done(null, user);
    });
  });

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ where: {username: username} }).then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    });
  }
));

router.get('/signup', function(req, res) {
  res.render('users/signup')
});

router.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (!username || !password) {
    req.flash('error', "Please, fill in all the fields.");
    res.redirect('signup')
  }
  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt)

  var newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  };

  models.User.create(newUser).then(function(user) {
    res.redirect('/')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.");
    res.redirect('/signup')
  })
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/data/new',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

router.get('/login', function(req, res, next) {
  res.render('users/login')
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/')
});

module.exports = router;