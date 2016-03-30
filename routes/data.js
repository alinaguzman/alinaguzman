var express = require('express');
var router = express.Router();
var models = require("../models");

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

router.get('/new', function(req, res, next) {
  // form to add manually
  models.sequelize.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'AND table_type='BASE TABLE';").then(function(tables) {
    tables.splice(0, 1);
    res.render('data/new', {tables: tables});
  })
});

router.post("/new", function(req, res) {
  //console.log(req.body);
  var table = req.body.table_type;

});

router.post("/Books/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Book.findOrCreate({where: { data: json_object,sub_data:json_object , name: req.body.name, category: req.body.category, length: req.body.length, author: req.body.author}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Citibikes/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Citibike.findOrCreate({where: { data: json_object,sub_data:json_object, start: req.body.start, end: req.body.end, length: req.body.length}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Cities/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.City.findOrCreate({where: { data: json_object,sub_data:json_object , name: req.body.name, state: req.body.state, length: req.body.length}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Coffees/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Coffee.findOrCreate({where: { data: json_object,sub_data:json_object , name: req.body.name, length: req.body.length, time: req.body.time}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Flights/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Flight.findOrCreate({where: { data: json_object,sub_data:json_object , airline: req.body.airline, depart: req.body.depart, length: req.body.length, arrive: req.body.arrive, price: req.body.price}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Gyms/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Gym.findOrCreate({where: { data: json_object,sub_data:json_object , studio: req.body.studio, category: req.body.category, name: req.body.name}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Mta/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Mta.findOrCreate({where: { data: json_object,sub_data:json_object , price: req.body.price}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Netflixes/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Netflix.findOrCreate({where: { data: json_object,sub_data:json_object , title: req.body.title, category: req.body.category, length: req.body.length, show: req.body.show, episode_count: req.body.episode_count}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Run/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Run.findOrCreate({where: { data: json_object,sub_data:json_object , title: req.body.title, distance: req.body.distance, pace: req.body.pace, time: req.body.time, race: req.body.race}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Sales/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Sale.findOrCreate({where: { data: json_object,sub_data:json_object , title: req.body.title, app: req.body.app, price: req.body.price}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
});

router.post("/Ubers/new", function(req, res) {
  var json_object = JSON.stringify(req.body);

  models.Uber.findOrCreate({where: { data: json_object,sub_data:json_object, start: req.body.start, end: req.body.end, length: req.body.length, price: req.body.price}})
    .spread(function(data, created) {
      if(created){
        res.redirect('back')
      }
    })
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