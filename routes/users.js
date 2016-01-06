var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var total = models.User.count().then(function(total){
      res.send('number of uss2: ' + total);
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

module.exports = router;
