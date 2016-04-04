"use strict";

module.exports = function(sequelize, DataTypes) {
  var Netflix = sequelize.define("Netflix", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    length: DataTypes.STRING,
    show: DataTypes.BOOLEAN,
    episode_count: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          id: this.id,
          activity_id: activity.id,
          length: this.length,
          show: this.show,
          episode_count: this.episode_count,
          title: activity.title,
          datetime: activity.datetime,
          category: activity.category
        };
      }
    }
  });

  return Netflix;
};