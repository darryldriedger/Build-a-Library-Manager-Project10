'use strict';
module.exports = function(sequelize, DataTypes) {
  var Qaform = sequelize.define('Qaform', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true
    // },

    
    // loaned_on: {
    //   type: DataTypes.DATEONLY,
    //   validate: {
    //     //date validations make sure it is a date that is basically today (can be changed to a different range)
    //     isDate: {
    //       msg: "Enter a valid Loaned On Date"
    //     },
    //     isAfter: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    //     isBefore: moment().add(1, 'days').format('YYYY-MM-DD'),
    //     notEmpty: true,
    //     len: {
    //       //validates that the length of the date is between 6 and 10 chars
    //       args: [6,10],
    //       msg: " Proper date format is (YYYY-MM-DD)"
    //     }
    //   }
    // }
    
  });

  return Qaform;
};
