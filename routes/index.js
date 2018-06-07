var express = require('express');
var router = express.Router();
var Books = require("../models").Books;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');//, { title: 'Library Manager Project 10' }
});
//BOOKS
//BOOKS
//BOOKS

          /*
            _____                  _
           |  __ \                | |
           | |__) |   ___    ___  | |_
           |  ___/   / _ \  / __| | __|
           | |      | (_) | \__ \ | |_
           |_|      \___/  |___/  \__|

          *//* POST create article. */
          router.post('/new_book', function(req, res, next) {

            Books.create(req.body).then(function() {

              console.log("posted new book");
              res.redirect("/all_books");
            }).catch(function(error){
                if(error.name === "SequelizeValidationError") {
                  // res.render("articles/new", {article: Article.build(req.body), errors: error.errors, title: "New Article"})
                  console.log("error");
                } else {
                  throw error;
                }
            }).catch(function(error){
                res.send(500, error);
             });
          ;});

router.get('/all_books', function(req, res, next) {
  res.render('books/all_books');
});
router.get('/book_detail', function(req, res, next) {
  res.render('books/book_detail');
});
router.get('/checked_books', function(req, res, next) {
  res.render('books/checked_books');
});
router.get('/new_book', function(req, res, next) {
  res.render('books/new_book');
});
router.get('/overdue_books', function(req, res, next) {
  res.render('books/overdue_books');
});
router.get('/return_book', function(req, res, next) {
  res.render('books/return_book');
});

//PATRONS
//PATRONS
//PATRONS
router.get('/all_patrons', function(req, res, next) {
  res.render('patrons/all_patrons');
});
router.get('/new_patron', function(req, res, next) {
  res.render('patrons/new_patron');
});
router.get('/patron_detail', function(req, res, next) {
  res.render('patrons/patron_detail');
});

//LOANS
//LOANS
//LOANS
router.get('/all_loans', function(req, res, next) {
  res.render('loans/all_loans');
});
router.get('/checked_loans', function(req, res, next) {
  res.render('loans/checked_loans');
});
router.get('/new_loan', function(req, res, next) {
  res.render('loans/new_loan');
});
router.get('/overdue_loans', function(req, res, next) {
  res.render('loans/overdue_loans');
});




module.exports = router;
