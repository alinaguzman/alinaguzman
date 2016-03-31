var models = require("../models");

module.exports = {
  postActivity: function (activity, post, callback) {
    var info = {
      'Runs': function () {
        models.Run.findOrCreate({
          where: {
            id: activity.id,
            race: post.race,
            pace: post.pace,
            distance: post.distance,
            time: post.time
          }
        }).spread(function (data, created) {
          return callback(created, data);
        });
      },
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
      }
    };
    return info[activity.type]();  },


  // returns combined Activity & Table model info
  getInfo: function(id, type, callback) {
    models.Activity.findById(id)
      .then(function(activity){
        var info = {
          'Runs': function() {
            models.Run.findById(id)
              .then(function(run) {
                return callback(run.getInfo(activity));
              });
          },
          'Books': function() {
            models.Book.findById(id)
              .then(function(book) {
                return callback(book.getInfo(activity));
              });
          }
        };
        return (info[type]());
      });
  }
};