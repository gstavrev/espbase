// Load required packages
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var models  = require('../models');

passport.use(new LocalStrategy({ usernameField: 'email'},
  function(email, password, done) {
    console.log("using new LocalStrategy!");
    models.User.findByEmail(email,
      function (user, err)
      {
        console.log("callback for findByEmail");
        if (err) { return done(err); }
        console.log("past error detection");
        if (!user) {
          console.log("Incorrect email.");
          return done(null, false, { message: 'Incorrect email.' });
        }
        models.User.validPassword(password, user.password, user, function(err, user){
          if (!user) {
            console.log("Incorrect password.");
            return done(null, false, { message: 'Incorrect password.' });
          }
          else {
            console.log("Correct password too!");
            return done(null, user);
          }
        })
      }
    );
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});


exports.isAuthenticated = function (req, res, next) {
  console.log("isAuthenticated");
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/login');
};

//exports.isAuthenticated = passport.authenticate('local', { session : true });

// exports.IsAuthenticated = function(req, res, next){
//   if(req.isAuthenticated()){
//     next();
//   } else {
//     next(new Error(401));
//   }
// }
