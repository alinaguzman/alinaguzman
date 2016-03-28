"use strict";

module.exports = function(sequelize, DataTypes) {
  var Citibike = sequelize.define("Citibike", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    length: DataTypes.STRING
  });

  return Citibike;
};