"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define("Sale", {
    app: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          app: this.app, // posh or merc
          price: this.price, // sold - not earnings
          title: activity.title, // description of piece
          datetime: activity.datetime, // date sold
          category: activity.category // type of piece
        };
      }
    }
  });

  return Sale;
};