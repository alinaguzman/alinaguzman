"use strict";

module.exports = function(sequelize, DataTypes) {
  var Checkin = sequelize.define("Checkin", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    subdata: DataTypes.TEXT // json from api
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
          subdata: this.subdata,
          title: activity.title, // name of venue
          datetime: activity.datetime, // date of checkin
          category: activity.category //category of venue
        };
      }
    }
  });
  return Checkin;
};