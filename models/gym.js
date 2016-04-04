"use strict";

module.exports = function(sequelize, DataTypes) {
  var Gym = sequelize.define("Gym", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    studio: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
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