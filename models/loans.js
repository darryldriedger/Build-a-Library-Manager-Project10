'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: DataTypes.DATE
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

  // Loan.associate = function(models) {
  //   // associations can be defined here
  // };
  return Loan;
};
