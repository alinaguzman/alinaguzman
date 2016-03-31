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
      race: DataTypes.BOOLEAN

    }, {
      instanceMethods: {
        getInfo: function(activity){
          var object = {
            distance: this.distance,
            time: this.time,
            race: this.race,
            title: activity.title,
            datetime: activity.datetime
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