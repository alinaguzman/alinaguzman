"use strict";

module.exports = function(sequelize, DataTypes) {
  var Coffee = sequelize.define("Coffee", {
    length: DataTypes.STRING,
    time: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          length: this.length,
          time: this.time,
          title: activity.title,
          datetime: activity.datetime,
          category: activity.category
        };
      }
    }
  });

  return Coffee;
};