"use strict";

module.exports = function(sequelize, DataTypes) {
  var Netflix = sequelize.define("Netflix", {
    length: DataTypes.STRING,
    show: DataTypes.BOOLEAN,
    episode_count: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
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