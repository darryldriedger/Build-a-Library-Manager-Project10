'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter a title"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter an author"
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter a genre"
        }
      }
    },
    first_published: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      // instances can be defined here
    }
  });

  // Book.associate = function(models) {
  //   // associations can be defined here
  // };
  return Book;
};
