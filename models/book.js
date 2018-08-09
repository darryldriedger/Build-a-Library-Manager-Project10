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
          msg: "Title is required"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author is required"
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Genre is required"
        }
      }
    },
    first_published: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Book.hasMany(models.Loan, {foreignKey: 'book_id'});
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
