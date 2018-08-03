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
// router.get('/checked_loans', function(req, res, next) {
//   res.render('loans/checked_loans');
// });
router.get('/new_loan', function(req, res, next) {
  res.render('loans/new_loan');
});
// router.get('/overdue_loans', function(req, res, next) {
//   res.render('loans/overdue_loans');
// });

module.exports = router;
