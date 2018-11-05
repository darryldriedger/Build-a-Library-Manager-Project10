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
         len: {
           args: [2,20],
           msg: "Please enter a First Name (2-10 characters)"
         }
       }
     },
    last_name:  {
       type: DataTypes.STRING,
       validate: {
         len: {
           args: [2,20],
           msg: "Please enter a Last Name (2-10 characters)"
         }
       }
     },
    address:  {
       type: DataTypes.STRING,
       validate: {
         len: {
           args: [2,30],
           msg: "Please enter an Address"
         }
       }
     },
    email:  {
       type: DataTypes.STRING,
       validate: {
         isEmail: {
           msg: "Please enter an Email"
         },
       }
     },
    library_id:  {
       type: DataTypes.STRING,
       validate: {
         len: {
           args: [1,10],
           msg: "Please enter a Library ID"
         }
       }
     },
    zip_code:  {
       type: DataTypes.INTEGER,
       validate: {
         is: {
           args: [/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/i],// This is regex for an american zip code [/(^\d{5}$)|(^\d{5}-\d{4}$)/],
           msg: "Please enter a Canadian Zip Code"
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
