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
  console.log("User post! : " + JSON.stringify(req.body));
  //var user_info = req.body;
  user = models.User.new(req.body, function(user){
    res.send('POST request for user' + JSON.stringify(user));
  });
});

router.post('/register', function (req, res) {
  console.log("/register" + JSON.stringify(req.body));
  user = models.User.register(req.body, function(user){
    if (user){
      res.redirect('/')
    }
    else {
      res.redirect('/signup')
    }
  });
});

router.post('/login', passport.authenticate('local',
  {
	  successRedirect: '/users',
	  failureRedirect: '/login_redirected'
  })
);


module.exports = router;
