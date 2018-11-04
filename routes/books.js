'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;
var moment = require('moment');
var Sequelize = require('sequelize');

const Op = Sequelize.Op;
let limit = 5;
let pageId = 'books';

router.get('/', function(req, res, next) {
  Book.findAndCountAll({
    offset: 0,
    limit: limit
  })
  .then(function(result){
    let books = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'books/booksPages/';
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
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset according to the page that is being chosen
  let offset = limit * (page - 1);
  Book.findAndCountAll({
    offset: offset,
    limit: limit
  })
  .then(function(result){
    let books = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'books/booksPages/';
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
            { 'genre': { [Op.like]: '%' + query + '%' } },
            { 'first_published': { [Op.like]: '%' + query + '%' } }
          ]
        }
      }).then(function(books){
        res.render('books',{books: books,title: 'Searched books'});
        // res.send(books);
      })
});

router.get('/checked_books', function(req, res, next) {
  Loan.findAndCountAll({
    include: [{ all: true }],
      where: {
      returned_on: null
    },
      offset: 0,
      limit: limit,
  }).then(function(result){
      let books = result.rows;
      let pages = Math.ceil(result.count / limit);
      let link = 'books/checkedbooksPages/';
    res.render('books/checked_books',{
      title: 'Checked Out Books',
      pageId: pageId,
      books: books,
      pages: pages,
      link: link
    });
    // res.send(books);
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/checkedbooksPages/:page', function(req, res, next) {
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset according to the page that is being chosen
  let offset = limit * (page - 1);
  Loan.findAndCountAll({
    include: [{ all: true }],
      where: {
      returned_on: null
    },
    offset: offset,
    limit: limit
  })
  .then(function(result){
    let books = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'books/checkedbooksPages/';
          res.render('books/checked_books',{
            title: 'Checked Out Books',
            pageId: pageId,
            books: books,
            pages: pages,
            link: link
          });
  }).catch(function(error){
      res.send(500, error);
   });
});

//--==========================
//--==========================
//--==========================

router.get('/overdue_books', function(req, res, next) {
var currentDate = moment().format('YYYY-MM-DD').toString();

Loan.findAndCountAll({
  include: [{ all: true }],
  where: {
    return_by: {
    [Op.lt]: currentDate
    },
    returned_on: {
      [Op.eq]: null
    }
  },
    offset: 0,
    limit: limit,
  }).then(function(result){
      let books = result.rows;
      let pages = Math.ceil(result.count / limit);
      let link = 'books/overduebooksPages/';

    res.render('books/overdue_books',{
      title: 'Overdue Books',
      pageId: pageId,
      books: books,
      pages: pages,
      link: link
    });
// res.send(books);
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/overduebooksPages/:page', function(req, res, next) {
var currentDate = moment().format('YYYY-MM-DD').toString();
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset according to the page that is being chosen
  let offset = limit * (page - 1);
  Loan.findAndCountAll({
    include: [{ all: true }],
    where: {
      return_by: {
      [Op.lt]: currentDate
      },
      returned_on: {
        [Op.eq]: null
      }
    },
    offset: offset,
    limit: limit
  })
  .then(function(result){
    let books = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'books/overduebooksPages/';
          res.render('books/overdue_books',{
            title: 'Overdue Books',
            pageId: pageId,
            books: books,
            pages: pages,
            link: link
          });
  }).catch(function(error){
      res.send(500, error);
   });
});



//--==========================
//--==========================
//--==========================



router.get('/new_book', function(req, res, next) {
  res.render('books/new_book',{title: 'New Book'});
});

/* POST create article. POST POST POST POST POST */
router.post('/new_book', function(req, res, next) {
  Book.create(req.body).then(function(book) {
    res.redirect("/books");
  }).catch(function(err){
      if(err.name === "SequelizeValidationError") {
        var titleErr = [];
        var genreErr = [];
        var authorErr = [];
        var yearErr = [];

        for (var i=0; i<err.errors.length; i++) {
          if (err.errors[i].path === 'title'){
            titleErr.push(err.errors[i].message)
          } else if (err.errors[i].path === 'genre'){
            genreErr.push(err.errors[i].message)
          } else if (err.errors[i].path === 'author'){
            authorErr.push(err.errors[i].message)
          } else if (err.errors[i].path === 'first_published'){
            yearErr.push(err.errors[i].message)
          }
        }
      res.render('books/new_book', {
        title: 'New Book',
        bookTitle: req.body.title,
        bookAuthor: req.body.author,
        bookGenre: req.body.genre,
        bookPublished: req.body.first_published,
        titleErr: titleErr,
        genreErr: genreErr,
        authorErr: authorErr,
        yearErr: yearErr
      });
      } else {
          return next(err);
        }
  });
  // .catch(function(error){
  //     res.send(500, error);
  //  });
});

/* PUT Edit/change book details. PUT PUT PUT PUT PUT  */
router.put('/:id', function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    return book.update(req.body);
  }).then(function(book){
    res.redirect('/books/');
    // res.send(req.body);
  }).catch(function(err){
      if(err.name === "SequelizeValidationError") {
        var errMessage = "Please submit changes with valid form field data(Title: 50chars,Author: 20chars,Genre: 20chars, Published: 4digits, Year 1700-2100)";
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
            loans: loans,
            errMessage: errMessage
          });
        }).catch(function(error){
            res.send(500, error);
         });
      }

    })
   //      .catch(function(error){
   //    console.log("there is a huge 500 error here");
   //    res.status(500).send(error);
   // });
});

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



module.exports = router;
