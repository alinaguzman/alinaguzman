"use strict";

module.exports = function(sequelize, DataTypes) {
  var Citibike = sequelize.define("Citibike", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    length: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
          length: this.length,
          start: this.start,
          end: this.end,
          title: activity.title,
          datetime: activity.datetime,
          category: activity.category
        };
      }
    }
  });

  return Citibike;
};