var express = require('express');
var router = express.Router();
var keys = require('../config/api');

var fourquareConfig = {
  'secrets' : {
    'clientId' : keys.foursquare.clientId,
    'clientSecret' : keys.foursquare.clientSecret,
    'redirectUrl' : keys.foursquare.redirectUrl
  }
};

var foursquare = require('node-foursquare')(fourquareConfig);
var foursquareAccessToken = keys.foursquare.accessToken;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alina Guzman' });
});

router.get('/foursquare', function(req, res, next) {
  foursquare.Users.getCheckins("self", {limit: 5}, foursquareAccessToken, function (err, checkins) {
    if(err) throw new Error(err);

    console.log(checkins.items);

      // Render!
      res.status('OK').json(checkins)
  });

});

module.exports = router;