"use strict";

module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("City", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    length: DataTypes.STRING
  });

  return City;
};