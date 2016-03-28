"use strict";

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    data: DataTypes.TEXT,
    sub_data: DataTypes.TEXT,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    length: DataTypes.STRING,
    author: DataTypes.STRING
  });

  return Book;
};