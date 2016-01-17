// Load required packages
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var models  = require('../models');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findOne({
    where: {
      id: id
    }
  }).then(function(item){
    done(null, item);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email'},
  function(email, password, done) {
    models.User.findByEmail(email,
      function (user, err)
      {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        models.User.validPassword(password, user.password, user, function(err, valid_user){
          if (!valid_user) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          else {
            return done(null,valid_user)
          }
        })
      }
    );
  }
));

exports.isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/users/login');
};
