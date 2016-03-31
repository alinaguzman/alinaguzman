"use strict";

module.exports = function(sequelize, DataTypes) {
  var Checkin = sequelize.define("Checkin", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    subdata: DataTypes.TEXT
  });

  return Checkin;
};