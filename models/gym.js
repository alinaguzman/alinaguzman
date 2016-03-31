"use strict";

module.exports = function(sequelize, DataTypes) {
  var Gym = sequelize.define("Gym", {
    studio: DataTypes.STRING,
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          studio: this.studio,
          title: activity.title,
          datetime: activity.datetime,
          category: activity.category // type of workout class
        };
      }
    }
  });

  return Gym;
};