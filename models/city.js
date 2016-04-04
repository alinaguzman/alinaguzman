"use strict";

module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("City", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    state: DataTypes.STRING,
    length: DataTypes.STRING // in days
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
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