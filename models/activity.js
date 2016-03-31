"use strict";

module.exports = function(sequelize, DataTypes){
  var Activity = sequelize.define("Activity", {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    data: DataTypes.TEXT,
    datetime: DataTypes.STRING
  });

  return Activity
};