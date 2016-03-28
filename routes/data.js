var express = require('express');
var router = express.Router();
var keys = require('../config/api');
var models = require("../models");
var querystring = require('querystring');

var fourquareConfig = {
  'secrets' : {
    'clientId' : keys.foursquare.clientId,
    'clientSecret' : keys.foursquare.clientSecret,
    'redirectUrl' : keys.foursquare.redirectUrl
  }
};

var foursquare = require('node-foursquare')(fourquareConfig);
var foursquareAccessToken = keys.foursquare.accessToken;

router.get('/new', function(req, res, next) {
  // form to add manually
  res.render('data/new');
});

router.post("/new", function(req, res) {
  console.log(req.body.name);
  res.send('OK')

});

// HITS API TO SAVE RECENT CHECKINS
router.get('/foursquare', function(req, res, next) {
  //use offset to page through data, by limits of 250
  foursquare.Users.getCheckins("self", {limit: 250, offset: 0}, foursquareAccessToken, function (err, checkins) {
    if(err) throw new Error(err);

    checkins["checkins"].items.forEach(function(checkin){
      //console.log(typeof (checkin.venue.categories[0].name))
      var category;
      if (checkin.venue.categories && checkin.venue.categories[0]){
        category = checkin.venue.categories[0].name
      } else {
        category = 'None'
      }

      models.Checkin.findOrCreate({where: { data: JSON.stringify(checkin),sub_data:JSON.stringify(checkin) , name: checkin.venue.name, category: category}})
        .spread(function(checkin, created) {
          console.log(checkin.get({
            plain: true
          }));
          console.log(created);
        })
    });

    //// Render the json out for now
    res.status('OK').json(checkins)
  })
});


module.exports = router;