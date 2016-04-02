"use strict";

module.exports = function(sequelize, DataTypes){
  var Activity = sequelize.define("Activity", {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    datetime: DataTypes.STRING
  });

  return Activity
};