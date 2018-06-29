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
/* _____          _
 / ____|        | |
| |  __    ___  | |_
| | |_ |  / _ \ | __|
| |__| | |  __/ | |_
\_____|  \___|  \__|
*/
//* GET Books listing. */
router.get('/books', function(req, res, next) {
  Book.findAll().then(function(books){
    res.render('books',{books: books});
  }).catch(function(error){
      res.send(500, error);
   });


});
router.get('/new_book', function(req, res, next) {
  res.render('new_book');
});
router.get('/overdue_books', function(req, res, next) {
  res.render('overdue_books');
});
router.get('/checked_books', function(req, res, next) {
  res.render('checked_books');
});
router.get('/book_detail', function(req, res, next) {
  res.render('book_detail');
});

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

// /*
//  _____          _       _____               _   _
// / ____|        | |     |_   _|             | | (_)
// | |  __    ___  | |_      | |    _ __     __| |  _  __   __
// | | |_ |  / _ \ | __|     | |   | '_ \   / _` | | | \ \ / /
// | |__| | |  __/ | |_     _| |_  | | | | | (_| | | |  \ V /
// \_____|  \___|  \__|   |_____| |_| |_|  \__,_| |_|   \_/
// */
// GET book details
router.get('/:id', function(req, res, next) {
  Book.findAll({
    include: [{ model: Loan, include: [{ model: Patron }] }],
    where: { id: req.params.id }
  })
  .then(function(bookdetails){

    var loansdata = JSON.parse(JSON.stringify(bookdetails));

    if (bookdetails) {
      res.render('partials/bookdetail', {
        title: 'Book Details',
        book: loansdata[0],
        loans: loansdata[0].Loans
      });
    } else {
      err.status == 404;
      return next(err);
    }

  }).catch(function(err){
    return next(err);
  });
});




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
