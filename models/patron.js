'use strict';
module.exports = (sequelize, DataTypes) => {
  var Patron = sequelize.define('Patron', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    first_name:  {
       type: DataTypes.STRING,
       validate: {
         notEmpty: {
           msg: "Please enter a First Name"
         }
       }
     },
    last_name:  {
       type: DataTypes.STRING,
       validate: {
         notEmpty: {
           msg: "Please enter a Last Name"
         }
       }
     },
    address:  {
       type: DataTypes.STRING,
       validate: {
         notEmpty: {
           msg: "Please enter an Address"
         }
       }
     },
    email:  {
       type: DataTypes.STRING,
       validate: {
         notEmpty: {
           msg: "Please enter an Email"
         }
       }
     },
    library_id:  {
       type: DataTypes.STRING,
       validate: {
         notEmpty: {
           msg: "Please enter a Library ID"
         }
       }
     },
    zip_code:  {
       type: DataTypes.INTEGER,
       validate: {
         notEmpty: {
           msg: "Please enter a Zip Code"
         }
       }
     },
  });

  Patron.associate = function(models) {
    // associations can be defined here
    Patron.hasMany(models.Loan, {foreignKey: 'patron_id'});
  };
  return Patron;
};
