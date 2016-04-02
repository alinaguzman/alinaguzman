"use strict";

module.exports = function(sequelize, DataTypes) {
  var Seamless = sequelize.define("Seamless", {
    price: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          price: this.price,
          title: activity.title, // name of restaurant
          datetime: activity.datetime,
          category: activity.category // type of food
        };
      }
    }
  });

  return Seamless;
};