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
        len: {
          args: [1,25],
          msg: "Please enter a Title"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2,20],
          msg: "Please enter an Author"
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3,20],
          msg: "Please enter a Genre"
        }
      }
    },
    first_published: {
      type: DataTypes.INTEGER,
      validate: {
         min: 1700,
         max: 2100,
        isNumeric: {
          msg: " Please enter a Year"
        },
        len: {
          args: [4,4],
          msg: " (input 4 digits)"
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
