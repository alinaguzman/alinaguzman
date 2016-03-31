"use strict";

module.exports = function(sequelize, DataTypes) {
  var Flight = sequelize.define("Flight", {
    airline: DataTypes.STRING,
    depart: DataTypes.STRING,
    arrive: DataTypes.STRING,
    price: DataTypes.STRING,
    length: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          length: this.length,
          airline: this.airline,
          depart: this.depart,
          arrive: this.arrive,
          price: this.price,
          title: activity.title,
          datetime: activity.datetime,
          category: activity.category
        };
      }
    }
  });

  return Flight;
};