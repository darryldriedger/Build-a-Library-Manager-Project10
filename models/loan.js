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
        len: {
          args: [1,50],
          msg: "Please choose a Book ID"
        }
      }
    },
    // patron_id: DataTypes.INTEGER,
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        len: {
          args: [1,40],
          msg: "Please choose a Patron ID"
        }
      }
    },
    // loaned_on: DataTypes.DATEONLY,
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Enter a valid Loaned On Date"
        },
        len: {
          args: [6,10],
          msg: " Proper date format is (YYYY-MM-DD)"
        }
      }
    },
    // return_by: DataTypes.DATEONLY,
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Please enter a valid Return By Date"
        },
        len: {
          args: [6,10],
          msg: " Proper date format is (YYYY-MM-DD)"
        }
      }
    },
    // returned_on: DataTypes.DATEONLY
    returned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Please enter a valid Returned On Date"
        },
        len: {
          args: [6,10],
          msg: " Proper date format is (YYYY-MM-DD)"
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
