'use strict';


var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
          //length validations to limit malicious inputs
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
          //length validations to limit malicious inputs
          args: [1,40],
          msg: "Please choose a Patron ID"
        }
      }
    },
    // loaned_on: DataTypes.DATEONLY,
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        //date validations make sure it is a date that is basically today (can be changed to a different range)
        isDate: {
          msg: "Enter a valid Loaned On Date"
        },
        isAfter: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        isBefore: moment().add(1, 'days').format('YYYY-MM-DD'),
        notEmpty: true,
        len: {
          //validates that the length of the date is between 6 and 10 chars
          args: [6,10],
          msg: " Proper date format is (YYYY-MM-DD)"
        }
      }
    },
    // return_by: DataTypes.DATEONLY,
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        //date validations make sure it is a date that is basically 7 days from today (can be changed to a different range)
        isDate: {
          msg: "Please enter a valid Return By Date"
        },
        isAfter: moment().format('YYYY-MM-DD'),
        isBefore: moment().add(8, 'days').format('YYYY-MM-DD'),
        notEmpty: true,
        len: {
          //validates that the length of the date is between 6 and 10 chars
          args: [6,10],
          msg: " Proper date format is (YYYY-MM-DD)"
        }
      }
    },
    // returned_on: DataTypes.DATEONLY
    returned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        //date validations make sure it is a date that is basically after yesterday (can be changed to a different range)
        isDate: {
          msg: "Please enter a valid Returned On Date"
        },
        isAfter: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        notEmpty: true,
        len: {
          //validates that the length of the date is between 6 and 10 chars
          args: [6,11],
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
