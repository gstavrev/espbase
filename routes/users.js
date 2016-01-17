var express = require('express');
var passport = require('passport');
var authController = require('../controllers/auth');

var router = express.Router();
var models  = require('../models');


// Authentication required route
router.get('/', authController.isAuthenticated, function(req, res) {
  var total = models.User.count().then(function(total){
    res.render('default', { title: 'Users', message: 'Number of users ' + total});
    }
  );
});

/* POST new users*/
router.post('/', function (req, res) {
  user = models.User.new(req.body, function(user){
    res.send('POST request for user' + JSON.stringify(user));
  });
});

router.post('/register', function (req, res) {
  user = models.User.register(req.body, function(user){
    if (user){
      res.redirect('/')
    }
    else {
      res.redirect('/signup')
    }
  });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/login', function (req, res, next){
  console.log("post to /login!");
  passport.authenticate('local',
  {
	  successRedirect: '/users',
	  failureRedirect: '/users/login',
    passReqToCallback : true
  })(req, res, next);
});

router.get('/login', function (req, res){
  res.render('login', { title: 'Login', message: 'Please login.'});
});

router.get('/register', function (req, res){
  res.render('register', { title: 'Registration', message: 'Register an account'});
});

module.exports = router;
