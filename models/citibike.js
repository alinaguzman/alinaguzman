"use strict";

module.exports = function(sequelize, DataTypes) {
  var Citibike = sequelize.define("Citibike", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    length: DataTypes.STRING
  });

  return Citibike;
};