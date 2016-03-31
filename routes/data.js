var express = require('express');
var router = express.Router();
var models = require("../models");
var utils = require('../lib/utils.js');

if(!process.env.FSCLIENTID){
  var config = require(__dirname + '/../config/api.js');
}

var foursquareConfig = {
  'secrets': {
    'clientId': process.env.FSCLIENTID,
    'clientSecret': process.env.FSCLIENTSECRET,
    'redirectUrl': process.env.FSREDIRECTURL
  }
};

var foursquare = require('node-foursquare')(foursquareConfig);
var foursquareAccessToken = process.env.FSACCESSTOKEN;

// Renders form to add manual new activity + sub-table
router.get('/new', function(req, res, next) {
  models.sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'AND table_type='BASE TABLE';").then(function(tables) {
    tables.splice(0, 1);
    res.render('data/new', {tables: tables});
  })
});

// TODO still need to join with sub-table models
router.get("/:activity", function(req, res) {
  models.Activity.findAll({
    where: {
      type: req.params.activity
    }
  }).then(function(runs) {
    res.json(runs)
  })
});

// TODO account for searching for missing table ids
// TODO ie Runs/5 but 5 is on hold for Books
router.get("/:activity/:id", function(req, res){
  utils.getInfo(req.params.id, req.params.activity, function(response){
    res.json(response)
  });
});

router.post("/:activity/new", function(req, res) {
  models.Activity.findOrCreate({
    where: {
      title: req.body.title,
      type: req.body.table_type, // or :activity?
      datetime: req.body.datetime,
      category: req.body.category
    }
  }).spread(function(activity, created){
    if(created){
      return utils.postActivity(activity, req.body, function(created, response){
        if(created){
          res.redirect(response.id)
        } else {
          res.send('not created')
        }
      });
    } else {
      console.log("did not create activity")
    }
  });
});

// HITS API TO SAVE RECENT CHECKINS
router.get('/foursquare', function(req, res, next) {
  //use offset to page through data, by limits of 250
  foursquare.Users.getCheckins("self", {limit: 250, offset: 0}, foursquareAccessToken, function (err, checkins) {
    if(err) throw new Error(err);
    checkins["checkins"].items.forEach(function(checkin){
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