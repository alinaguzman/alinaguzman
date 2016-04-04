"use strict";

module.exports = function(sequelize, DataTypes){
  var Activity = sequelize.define("Activity", {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    datetime: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(){
        return {
          id: this.id,
          title: this.title,
          type: this.type,
          datetime: this.datetime,
          category: this.category
        };
      }
    }
  });

  return Activity
};