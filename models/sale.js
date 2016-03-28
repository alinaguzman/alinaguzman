"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define("Sale", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    title: DataTypes.STRING,
    app: DataTypes.STRING,
    price: DataTypes.STRING
  });

  return Sale;
};