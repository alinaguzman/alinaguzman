var models = require("../models");

module.exports = {
  postActivity: function (activity, post, callback) {
    var info = {
      'Books': function () {
        models.Book.findOrCreate({
          where: {
            id: activity.id,
            length: post.length,
            author: post.author
          }
        }).spread(function (data, created) {
          return callback(created, data);
        });
      },
      'Checkins': function () {
        models.Checkin.findOrCreate({
          where: {
            id: activity.id,
            subdata: post.subdata
          }
        }).spread(function (data, created) {
          return callback(created, data);
        });
      },
      'Citibikes': function() {
        models.Citibike.findOrCreate({
          where: {
            id: activity.id,
            start: post.start,
            end: post.end,
            length: post.length
          }
        }).spread(function(data, created){
          return callback(created, data)
        })
      },
      'Cities': function() {
        models.City.findOrCreate({
          where: {
            id: activity.id,
            state: post.state,
            length: post.length
          }
        }).spread(function(data, created){
          return callback(created, data)
        })
      },
      'Coffees': function() {
        models.Coffee.findOrCreate({
          where: {
            id: activity.id,
            length: post.length,
            time: post.time
          }
        }).spread(function(data,created){
          return callback(created, data)
        })
      },
      'Flights': function() {
        models.Flight.findOrCreate({
          where: {
            id: activity.id,
            length: post.length,
            price: post.price,
            depart: post.depart,
            arrive: post.arrive,
            airline: post.airline
          }
        }).spread(function(data,created){
          return callback(created, data)
        })
      },
      'Gyms': function() {
        models.Gym.findOrCreate({
          where: {
            id: activity.id,
            studio: post.studio
          }
        }).spread(function(data,created){
          return callback(created, data)
        })
      },
      'Mta': function() {
        models.Mta.findOrCreate({
          where: {
            id: activity.id,
            price: post.price
          }
        }).spread(function(data,created){
          return callback(created, data)
        })
      },
      'Nails': function(){
        models.Nail.findOrCreate({
          where: {
            id: activity.id,
            price: post.price,
            salon: post.salon
          }
        })
      },
      'Netflixes': function() {
        models.Netflix.findOrCreate({
          where: {
            id: activity.id,
            length: post.length,
            show: post.show,
            episode_count: post.episode_count
          }
        }).spread(function(data,created){
          return callback(created, data)
        })
      },
      'Runs': function () {
        models.Run.findOrCreate({
          where: {
            id: activity.id,
            distance: post.distance,
            time: post.time,
            pace: post.pace
          }
        }).spread(function (data, created) {
          return callback(created, data);
        });
      },
      'Sales': function() {
        models.Sale.findOrCreate({
          where: {
            id: activity.id,
            app: post.app,
            price: post.price
          }
        }).spread(function(data,created){
          return callback(created, data)
        })
      },
      'Seamlesses': function() {
        models.Seamless.findOrCreate({
          where: {
            id: activity.id,
            price: post.price
          }
        }).spread(function(data,created){
          return callback(created, data)
        })
      },
      'Ubers': function() {
        models.Uber.findOrCreate({
          where: {
            id: activity.id,
            price: post.price,
            length: post.length,
            start: post.start,
            end: post.end
          }
        }).spread(function(data,created){
          return callback(created, data)
        })
      }
    };
    return info[activity.type]();
  },

  // returns combined Activity & Table model info
  getInfo: function(id, type, callback) {
    models.Activity.findById(id)
      .then(function(activity){
        var info = {
          'Books': function() {
            models.Book.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Checkins': function() {
            models.Checkin.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Citibikes': function() {
            models.Citibike.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Cities': function() {
            models.City.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Coffees': function() {
            models.Coffee.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Flights': function() {
            models.Flight.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Gyms': function() {
            models.Gym.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Mta': function() {
            models.Mta.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
           'Nails': function(){
             models.Nail.findById(id)
               .then(function(data){
                 return data ? callback(data.getInfo(activity)) : callback('204');
               })
           },
          'Netflixes': function() {
            models.Netflix.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Runs': function() {
            models.Run.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Sales': function() {
            models.Sale.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Seamlesses': function() {
            models.Seamless.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          },
          'Ubers': function() {
            models.Uber.findById(id)
              .then(function(data) {
                return data ? callback(data.getInfo(activity)) : callback('204');
              });
          }
        };
        return (info[type]());
      });
  }
};