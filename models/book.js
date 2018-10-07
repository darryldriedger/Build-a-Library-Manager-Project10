'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true
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
    first_published: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Please enter a Year (4 digits)"
        }
      }
    },
    loan_status: DataTypes.STRING
  });

  Book.associate = function(models) {
    // associations can be defined here
    Book.hasMany(models.Loan, {foreignKey: 'book_id'});
  };
  return Book;
};
