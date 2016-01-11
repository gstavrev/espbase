"use strict";

var bcrypt = require('bcrypt-nodejs');

var SALT_WORK_FACTOR = 12;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      new: function(user, cb){
        console.log("user.new");
        var created = User
          .create({ email: user.email, first_name: user.first_name, last_name: user.last_name, password: user.password })
          .then(function(user) {
            console.log("created new user");
            cb(user);
          });
        return created;
      },
      findByEmail: function(email, cb){
        console.log("user.findByEmail: " + email);
        User.findOne({
          where: {
            email: email
          }
        }).then(cb);
      },
      validPassword: function(password, passwd, user, done){
        console.log('user.validPassword');
        bcrypt.compare(password, passwd, function(err, isMatch){
          if (err) console.log(err)
          console.log("isMatch: " + isMatch);
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      },
      register: function(user, cb){
        console.log("user.register: " + user.email);
        User.findAll({
          where: {
            email: user.email
          }
        }).then(function(u){
          if (u.length > 0)
          {
            console.log("user already exists");
            cb(null)
          }
          else {
            this.new(user, cb);
          }
        });
      }
    }
  });

  User.hook('beforeCreate', function(user, options, fn){
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      return salt
    });
    console.log('beforeCreate salt: ' + salt + ' for password ' + JSON.stringify(user) + JSON.stringify(options));
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
        user.password = hash;
      return fn(null, user)
    });
  })

  return User;
};
