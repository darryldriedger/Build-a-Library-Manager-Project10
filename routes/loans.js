'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;


router.get('/', function(req, res, next) {
  Book.findAll().then(function(books){
    res.render('loans');
  }).catch(function(error){
      res.send(500, error);
   });
});
router.get('/checked_loans', function(req, res, next) {
  res.render('loans/checked_loans');
});
// router.get('/new_loan', function(req, res, next) {
//   Book.findAll().then(function(books){
//     res.render('loans/new_loan',{books: books});
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });
router.get('/overdue_loans', function(req, res, next) {
  res.render('loans/overdue_loans');
});



router.get('/new_loan', function(req, res, next) {
  var books;
  var patrons;

  Book.findAll().then(function(results){
    books = results;
  }).then(
    Patron.findAll().then(function(results){
      patrons = results;
    }).then(function(){
      res.render('loans/new_loan', {
        books: books,
        patrons: patrons});
    }).catch(function(err){
      return next(err);
    })
  );
});



module.exports = router;
