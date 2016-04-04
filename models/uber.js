"use strict";

module.exports = function(sequelize, DataTypes) {
  var Uber = sequelize.define("Uber", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    length: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
          length: this.length, // total trip time
          start: this.start, // address
          end: this.end,
          price: this.price,
          title: activity.title, // from email subject
          datetime: activity.datetime,
          category: activity.category
        };
      }
    }
  });

  return Uber;
};