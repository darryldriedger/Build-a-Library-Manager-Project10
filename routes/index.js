'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
// var Loans = require("../models").Loans;
// var Patrons = require("../models").Patrons;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// //BOOKS
// //BOOKS
// //BOOKS
// /* _____          _
//  / ____|        | |
// | |  __    ___  | |_
// | | |_ |  / _ \ | __|
// | |__| | |  __/ | |_
// \_____|  \___|  \__|
// */
// //* GET all Books listings. */
// router.get('/books', function(req, res, next) {
//   Book.findAll().then(function(books){
//     res.render('books',{books: books});
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });
//
// router.get('/new_book', function(req, res, next) {
//   res.render('new_book');
// });
// router.get('/overdue_books', function(req, res, next) {
//   res.render('overdue_books');
// });
// router.get('/checked_books', function(req, res, next) {
//   res.render('checked_books');
// });
// router.get('/book_detail', function(req, res, next) {
//   // console.log("one");
//   res.render('book_detail');
// });
//
// /*
//   _____                  _
//  |  __ \                | |
//  | |__) |   ___    ___  | |_
//  |  ___/   / _ \  / __| | __|
//  | |      | (_) | \__ \ | |_
//  |_|      \___/  |___/  \__|
//
// *//* POST create article. */
// router.post('/new_book', function(req, res, next) {
//   Book.create(req.body).then(function(book) {
//     res.redirect("/books");
//   }).catch(function(error){
//       if(error.name === "SequelizeValidationError") {
//         console.log("error");
//       } else {
//         throw error;
//       }
//   }).catch(function(error){
//       res.send(500, error);
//    });
// ;});
// /*
//  _____            _
// |  __ \          | |
// | |__) |  _   _  | |_
// |  ___/  | | | | | __|
// | |      | |_| | | |_
// |_|       \__,_|  \__|
// */
// router.put('/book_detail/:id', function(req, res, next){
//   Book.findById(req.params.id).then(function(bookDetail){
//     return bookDetail.update(req.body);
//   }).then(function(bookDetail){
//     res.redirect('/book_detail/' + bookDetail.id);
//   }).catch(function(error){
//       console.log("there is a huge 500 error here");
//       res.status(500).send(error);
//    });
// });
//
// // /*
// //  _____          _       _____               _   _
// // / ____|        | |     |_   _|             | | (_)
// // | |  __    ___  | |_      | |    _ __     __| |  _  __   __
// // | | |_ |  / _ \ | __|     | |   | '_ \   / _` | | | \ \ / /
// // | |__| | |  __/ | |_     _| |_  | | | | | (_| | | |  \ V /
// // \_____|  \___|  \__|   |_____| |_| |_|  \__,_| |_|   \_/
// // */
//
// // GET incividual book details
// //------> Find by id to retrieve specific book detail
// router.get('/book_detail/:id', function(req, res, next) {
//   Book.findById(req.params.id).then(function(bookDetail){
//     res.render('book_detail',{bookDetail: bookDetail});
//   }).catch(function(error){
//       res.send(500, error);
//    });
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
