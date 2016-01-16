var express = require('express');
var passport = require('passport');
var authController = require('../controllers/auth');

var router = express.Router();
var models  = require('../models');

/* GET users listing. */
//router.route('/').get(authController.isAuthenticated, function(req, res, next) {

router.get('/', authController.isAuthenticated, function(req, res) {
  var total = models.User.count().then(function(total){
      res.send('number of users: ' + total);
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

router.post('/login', function (req, res, next){
  console.log("post to /login!");
  //gdone = function(){console.log("done!!!!!")};
  passport.authenticate('local',
  {
	  successRedirect: '/users',
	  failureRedirect: '/users/login',
    passReqToCallback : true
  })(req, res, next);


  // passport.authenticate('local')(req, res, function () {
  //   console.log("Logged in!");
  //   res.redirect('/users');
  //   console.log("done Logged in!");
  // });

});

router.get('/login', function (req, res){
  res.render('login', { title: 'Login page', message: 'Hello from the login page!'});
});

module.exports = router;
