"use strict";

module.exports = function(sequelize, DataTypes) {
  var Mta = sequelize.define("Mta", {
    price: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          price: this.price,
          title: activity.title,
          datetime: activity.datetime,
          category: activity.category
        };
      }
    }
  });

  return Mta;
};