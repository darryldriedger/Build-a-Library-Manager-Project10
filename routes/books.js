'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;

//* GET all Books listings. GET GET GET GET GET */
router.get('/', function(req, res, next) {
  Book.findAll().then(function(books){
    res.render('books',{books: books});
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/new_book', function(req, res, next) {
  res.render('books/new_book');
});
router.get('/overdue_books', function(req, res, next) {
  res.render('overdue_books');
});
router.get('/checked_books', function(req, res, next) {
  res.render('checked_books');
});

/* POST create article. POST POST POST POST POST */
router.post('/new_book', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect("/books");
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

/* GET incividual book details GETiNDIV GETiNDIV GETiNDIV */
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(book){
    res.render('books/book_detail',{book: book});
  }).catch(function(error){
      res.send(500, error);
   });
});


module.exports = router;
