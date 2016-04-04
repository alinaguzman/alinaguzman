"use strict";

module.exports = function(sequelize, DataTypes) {
  var Seamless = sequelize.define("Seamless", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    price: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
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