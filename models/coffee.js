"use strict";

module.exports = function(sequelize, DataTypes) {
  var Coffee = sequelize.define("Coffee", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    name: DataTypes.STRING,
    length: DataTypes.STRING,
    time: DataTypes.STRING
  });

  return Coffee;
};