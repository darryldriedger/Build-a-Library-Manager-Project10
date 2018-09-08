'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;
var moment = require('moment');
// const Op = Sequelize.Op;

//* GET all Books listings. GET GET GET GET GET */
router.get('/', function(req, res, next) {
  Book.findAll().then(function(books){
    res.render('books',{books: books,title: 'Books'});
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/overdue_books', function(req, res, next) {
  Book.findAll().then(function(books){
    res.render('books/overdue_books',{books: books,title: 'Overdue Books'});
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/checked_books', function(req, res, next) {
  Loan.findAll({
    include: [{ all: true }],
      where: {
      returned_on: null
    }
  }).then(function(books){
    res.render('books/checked_books',{books: books,title: 'Checked Out Books'});
    // res.send(books);
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/new_book', function(req, res, next) {
  res.render('books/new_book',{title: 'New Book'});
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
    // res.send(req.body);
  }).catch(function(error){
      console.log("there is a huge 500 error here");
      res.status(500).send(error);
   });
});

/* GET incividual book details GETiNDIV GETiNDIV GETiNDIV */
// router.get('/:id', function(req, res, next) {
//   Book.findById(req.params.id).then(function(book){
//     res.render('books/book_detail',{book: book});
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });

//-------------------------------------------------------------
/* GET incividual book details GETiNDIV GETiNDIV GETiNDIV */
router.get('/:id', function(req, res, next) {
  Book.findAll({
    include: [{ model: Loan, include: [{ model: Patron }] }],
  where: {id: req.params.id}
  })
    .then(function(data){
      var bookInfo = JSON.parse(JSON.stringify(data));
      let book = bookInfo[0];
      let loans = book.Loans;
    res.render('books/book_detail',{
      book: book,
      loans: loans
    });
  }).catch(function(error){
      res.send(500, error);
   });
});
//-------------------------------------------------------------
module.exports = router;
