"use strict";

module.exports = function(sequelize, DataTypes) {
  var Uber = sequelize.define("Uber", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    length: DataTypes.STRING,
    price: DataTypes.STRING
  });

  return Uber;
};