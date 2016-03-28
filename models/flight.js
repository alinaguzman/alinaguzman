"use strict";

module.exports = function(sequelize, DataTypes) {
  var Flight = sequelize.define("Flight", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    airline: DataTypes.STRING,
    depart: DataTypes.STRING,
    arrive: DataTypes.STRING,
    price: DataTypes.STRING,
    length: DataTypes.STRING
  });

  return Flight;
};