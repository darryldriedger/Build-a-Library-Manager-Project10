'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
// var Loans = require("../models").Loans;
// var Patrons = require("../models").Patrons;


/* _____          _
 / ____|        | |
| |  __    ___  | |_
| | |_ |  / _ \ | __|
| |__| | |  __/ | |_
\_____|  \___|  \__|
*/
//* GET all Books listings. */
router.get('/', function(req, res, next) {
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
// router.get('/book_detail', function(req, res, next) {
//   // console.log("one");
//   res.render('book_detail');
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
/*
 _____            _
|  __ \          | |
| |__) |  _   _  | |_
|  ___/  | | | | | __|
| |      | |_| | | |_
|_|       \__,_|  \__|
*/
router.put('/:id', function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    // console.log("this is in the put1:");
    // console.log(book);
    return book.update(req.body);
  }).then(function(book){
    // res.send("is this working?");
    // console.log("this is in the put2:" );
    // console.log(book);
    res.redirect('/books/' + book.id);
    // res.redirect('/books/' + book.id);
  }).catch(function(error){
      console.log("there is a huge 500 error here");
      res.status(500).send(error);
   });
});

// // /*
// ______       _   _   _
// |  ____|     | | (_) | |
// | |__      __| |  _  | |_
// |  __|    / _` | | | | __|
// | |____  | (_| | | | | |_
// |______|  \__,_| |_|  \__|
//   _____               _   _
//  |_   _|             | | (_)
//    | |    _ __     __| |  _  __   __
//   | |   | '_ \   / _` | | | \ \ / /
//  _| |_  | | | | | (_| | | |  \ V /
// |_____| |_| |_|  \__,_| |_|   \_/
// */

// GET incividual book details
//------> Find by id to retrieve specific book detail
router.get('/:id/edit', function(req, res, next) {
  Book.findById(req.params.id).then(function(book){
    // console.log("this is in the indiv:");
    // console.log(book);
    res.render('book_detail',{book: book});
  }).catch(function(error){
      res.send(500, error);
   });
});
/*
 _____          _       _____               _   _
/ ____|        | |     |_   _|             | | (_)
| |  __    ___  | |_      | |    _ __     __| |  _  __   __
| | |_ |  / _ \ | __|     | |   | '_ \   / _` | | | \ \ / /
| |__| | |  __/ | |_     _| |_  | | | | | (_| | | |  \ V /
\_____|  \___|  \__|   |_____| |_| |_|  \__,_| |_|   \_/
*/
router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(book){
    // console.log("this is in the indiv:");
    // console.log(book);
    res.render('book_detail',{book: book});
  }).catch(function(error){
      res.send(500, error);
   });
});

module.exports = router;
