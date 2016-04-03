"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    access_token:   DataTypes.STRING,
    refresh_token:  DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  });

  return User;
};