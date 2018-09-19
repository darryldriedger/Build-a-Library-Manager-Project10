'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let limit = 5;
let pageId = 'books';
//* GET all Books listings. GET GET GET GET GET */
// router.get('/', function(req, res, next) {
//   Book.findAll().then(function(books){
//     res.render('books',{books: books,title: 'Books'});
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });
router.get('/', function(req, res, next) {
  //the limit of loans per page
  // let limit = 5;
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset accordint to the page that is being chosen
  let offset = limit * (page - 1);
  Book.findAndCountAll({
    offset: 0,
    limit: limit
  // Loan.findAndCountAll()
  // Loan.count()
  })
  .then(function(result){
    let books = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'books/booksPages/';
    // res.send(loans);
    console.log(page);
    console.log(pageId);
        // res.send(books);
          res.render('books',{
            title: 'Books',
            pageId: pageId,
            books: books,
            pages: pages,
            link: link
          });
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/booksPages/:page', function(req, res, next) {
  //the limit of loans per page
  // let limit = 5;
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset accordint to the page that is being chosen
  let offset = limit * (page - 1);
  Book.findAndCountAll({
    offset: offset,
    limit: limit
  // Loan.findAndCountAll()
  // Loan.count()
  })
  .then(function(result){
    let books = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'books/booksPages/';
    // res.send(loans);
    console.log(page);
    console.log(pageId);
        // res.send("Math");
          res.render('books',{
            title: 'Books',
            pageId: pageId,
            books: books,
            pages: pages,
            link: link
          });
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/search/:query', function(req, res, next) {
  var query = req.params.query;
    Book.findAll({
      where: {
        $or: [
          { 'title': { [Op.like]: '%' + query + '%' } },
          { 'author': { [Op.like]: '%' + query + '%' } },
          { 'genre': { [Op.like]: '%' + query + '%' } }
        ]
      }
    }).then(function(books){
      res.render('books',{books: books,title: 'Searched books'});
      // res.send(books);
    })
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

router.get('/overdue_books', function(req, res, next) {
var currentDate = moment();
Loan.findAll({
  include: [{ all: true }],
  where: {
    return_by: {
    [Op.lt]: currentDate
    },
    returned_on: {
      [Op.eq]: null
    }
  }
  }).then(function(books){
    res.render('books/overdue_books',{books: books,title: 'Overdue Books'});
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
    res.redirect('/books/');
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
