"use strict";

module.exports = function(sequelize, DataTypes) {
  var Netflix = sequelize.define("Netflix", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    title: DataTypes.STRING,
    length: DataTypes.STRING,
    show: DataTypes.BOOLEAN,
    episode_count: DataTypes.STRING,
    genre: DataTypes.STRING
  });

  return Netflix;
};