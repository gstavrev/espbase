"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    classMethods: {
      new: function(user, cb){
        console.log("user.news");
        var created = User
          .create({ email: user.email, first_name: user.first_name, last_name: user.last_name })
          .then(function(user) {
            console.log("created new user");
            cb(user);
          });
        return created;
        }
      }
  });

  return User;
};
