"use strict";

module.exports = function(sequelize, DataTypes) {
  var Mta = sequelize.define("Mta", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    price: DataTypes.STRING
  });

  return Mta;
};