'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;
var moment = require('moment');

router.get('/', function(req, res, next) {
  Loan.findAll({
    include: [{ all: true }]
  }).then(function(loans){
    res.render('loans',{loans: loans});
    // res.send(loans);
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/checked_loans', function(req, res, next) {
  res.render('loans/checked_loans');
});

router.get('/overdue_loans', function(req, res, next) {
  res.render('loans/overdue_loans');
});



router.get('/new_loan', function(req, res, next) {
  var books;
  var patrons;
  var currentDate = moment().format('YYYY/MM/DD');
  var returnDate = moment().add(7, 'd').format('l');

  Book.findAll().then(function(results){
    books = results;
  }).then(
    Patron.findAll().then(function(results){
      patrons = results;
    }).then(function(){
      res.render('loans/new_loan', {
        books: books,
        patrons: patrons,
        cDate: currentDate,
        rDate: returnDate
      });
    }).catch(function(err){
      return next(err);
    })
  );
});

/* PUT Edit/change book details. PUT PUT PUT PUT PUT  */
router.put('/:id', function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    return book.update(req.body);
  }).then(function(book){
    res.redirect('/books/' + book.id);
  }).catch(function(error){
      console.log("there is a huge 500 error here");
      res.status(500).send(error);
   });
});

/* POST create article. POST POST POST POST POST */
router.post('/new_loan', function(req, res, next) {
  Loan.create(req.body).then(function(loan) {
    res.redirect("/loans");
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        console.log("error");
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
;});








module.exports = router;
