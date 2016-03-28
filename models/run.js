"use strict";

module.exports = function(sequelize, DataTypes) {
  var Run = sequelize.define("Run", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    title: DataTypes.STRING,
    distance: DataTypes.STRING,
    pace: DataTypes.STRING,
    time: DataTypes.STRING,
    race: DataTypes.BOOLEAN
  });

  return Run;
};