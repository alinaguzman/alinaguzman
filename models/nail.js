"use strict";

module.exports = function(sequelize, DataTypes) {
  var Nail = sequelize.define("Nail", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    price: DataTypes.STRING,
    salon: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
          price: this.price,
          salon: this.salon,
          title: activity.title,
          datetime: activity.datetime,
          category: activity.category
        };
      }
    }
  });

  return Nail;
};