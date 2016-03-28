"use strict";

module.exports = function(sequelize, DataTypes) {
  var Checkin = sequelize.define("Checkin", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    name: DataTypes.STRING,
    category: DataTypes.STRING
  });

  return Checkin;
};