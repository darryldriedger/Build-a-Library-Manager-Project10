'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    // book_id: DataTypes.INTEGER,
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Please choose a Book ID"
        }
      }
    },
    // patron_id: DataTypes.INTEGER,
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Please choose a Patron ID"
        }
      }
    },
    // loaned_on: DataTypes.DATEONLY,
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "Please enter a Loaned On Date"
        }
      }
    },
    // return_by: DataTypes.DATEONLY,
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "Please enter a Return By Date"
        }
      }
    },
    // returned_on: DataTypes.DATEONLY
    returned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "Please enter a Returned On Date"
        }
      }
    },
  });

  Loan.associate = function(models) {
    // associations can be defined here
      Loan.belongsTo(models.Patron, {foreignKey: 'patron_id'});
      Loan.belongsTo(models.Book, {foreignKey: 'book_id'});
  };
  return Loan;
};
