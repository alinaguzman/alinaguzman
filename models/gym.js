"use strict";

module.exports = function(sequelize, DataTypes) {
  var Gym = sequelize.define("Gym", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    studio: DataTypes.STRING,
    category: DataTypes.STRING,
    name: DataTypes.STRING
  });

  return Gym;
};