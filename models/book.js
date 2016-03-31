"use strict";

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: false
    },
    length: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    instanceMethods: {
      getInfo: function(activity){
        return {
          length: this.length,
          author: this.author,
          title: activity.title,
          datetime: activity.datetime, // date finished
          category: activity.category  // genre
        };
      },
      getActivity: function(models, callback){
        models.Activity.findById(this.id)
          .then(function(activity){
            return callback(activity)
          });
      }
    }
  });

  return Book;
};