"use strict";

module.exports = function(sequelize, DataTypes) {
  var Coffee = sequelize.define("Coffee", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    length: DataTypes.STRING,
    time: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
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