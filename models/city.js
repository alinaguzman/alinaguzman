"use strict";

module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("City", {
    state: DataTypes.STRING,
    length: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          length: this.length,
          state: this.state,
          title: activity.title,
          datetime: activity.datetime,
          category: activity.category
        };
      }
    }
  });

  return City;
};