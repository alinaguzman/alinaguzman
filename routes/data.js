var express = require('express');
var router = express.Router();
var keys = require('../config/api');
var models = require("../models");
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
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
  sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'AND table_type='BASE TABLE';").then(function(tables) {
    tables.splice(0, 1);
    res.render('data/new', {tables: tables});
  })
});

router.post("/new", function(req, res) {
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