'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loans = require("../models").Loans;
var Patrons = require("../models").Patrons;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');//, { title: 'Library Manager Project 10' }
});
// router.get('/books/books', function(req, res, next) {
//   res.render('books/books');//, { title: 'Library Manager Project 10' }
// });


/*
  _____                  _
 |  __ \                | |
 | |__) |   ___    ___  | |_
 |  ___/   / _ \  / __| | __|
 | |      | (_) | \__ \ | |_
 |_|      \___/  |___/  \__|

*//* POST create article. */
router.post('/new_book', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    console.log("this is the start");
    console.log("this is the start");
    console.log(req.body.title);
    console.log("this is the end");

    res.redirect("/books");
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
/* _____          _
 / ____|        | |
| |  __    ___  | |_
| | |_ |  / _ \ | __|
| |__| | |  __/ | |_
\_____|  \___|  \__|
*/
//* GET articles listing. */

// router.get('/books', function(req, res, next) {
//   res.render('books/books');
// });

router.get('/books', function(req, res, next) {
  Book.findAll().then(function(books){
    console.log("this is the start");
    console.log("this is the start");
    console.log("find the book");
    console.log("this is the end");
    res.render('books',{books: books});
  }).catch(function(error){
      res.send(500, error);
   });
});
router.get('/new_book', function(req, res, next) {
  res.render('books/new_book');
});
// router.get('/', function(req, res, next) {
//   Book.findAll({order: 'title'}).then(function(booklistings){
//     if(booklistings){
//       res.render('/books', {
//         title: 'Books',
//         books: booklistings
//       });
//     } else {
//       err.status == 404;
//       return next (err);
//     }
//   }).catch(function(err){
//     return next(err);
//   });
// });






// //PATRONS
// //PATRONS
// //PATRONS
// router.get('/all_patrons', function(req, res, next) {
//   res.render('patrons/all_patrons');
// });
// router.get('/new_patron', function(req, res, next) {
//   res.render('patrons/new_patron');
// });
// router.get('/patron_detail', function(req, res, next) {
//   res.render('patrons/patron_detail');
// });
//
// //LOANS
// //LOANS
// //LOANS
// router.get('/all_loans', function(req, res, next) {
//   res.render('loans/all_loans');
// });
// router.get('/checked_loans', function(req, res, next) {
//   res.render('loans/checked_loans');
// });
// router.get('/new_loan', function(req, res, next) {
//   res.render('loans/new_loan');
// });
// router.get('/overdue_loans', function(req, res, next) {
//   res.render('loans/overdue_loans');
// });




module.exports = router;
