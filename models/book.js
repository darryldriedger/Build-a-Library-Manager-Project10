'use strict';
//var dateFormat = require('dateformat');

module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    title: {
      type: DataTypes.STRING//,
      // validate: {
      //   notEmpty: {
      //     msg: "Please enter a title"
      //   }
      // }
    },
    author: {
      type: DataTypes.STRING//,
      // validate: {
      //   notEmpty: {
      //     msg: "Please enter an author"
      //   }
      // }
    },
    genre: {
      type: DataTypes.STRING//,
      // validate: {
      //   notEmpty: {
      //     msg: "Please enter a genre"
      //   }
      // }
    },
    first_published: DataTypes.INTEGER
  }, {});

  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
