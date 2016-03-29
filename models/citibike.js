"use strict";

module.exports = function(sequelize, DataTypes) {
  var Citibike = sequelize.define("Citibike", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    length: DataTypes.STRING
  });

  return Citibike;
};