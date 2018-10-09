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
          msg: "Please enter a Title"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter an Author"
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter a Genre"
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
