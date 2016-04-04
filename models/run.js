"use strict";

module.exports = function(sequelize, DataTypes) {
  var Run = sequelize.define("Run", {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: false
      },
      distance: DataTypes.STRING,
      pace: DataTypes.STRING,
      time: DataTypes.STRING,
      link: DataTypes.STRING
    }, {
      instanceMethods: {
        getInfo: function(activity){
          var object = {
            id: this.id,
            activity_id: activity.id,
            title: activity.title,
            distance: this.distance,
            time: this.time,
            pace: this.pace,
            link: this.link, // strava or race result link
            datetime: activity.datetime,
            category: activity.category // race or training
          };
          return object
        },
        getActivity: function(models, callback){
          models.Activity.findById(this.id)
            .then(function(activity){
              return callback(activity)
            });
        }
      }
    }
  );

  return Run;
};