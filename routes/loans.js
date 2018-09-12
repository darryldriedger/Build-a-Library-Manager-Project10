'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;
var moment = require('moment');

router.get('/', function(req, res, next) {
  //the limit of loans per page
  let limit = 6;
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset accordint to the page that is being chosen
  let offset = limit * (page - 1);
  Loan.findAndCountAll({
    include: [{ all: true }],
    offset: 0,
    limit: limit
  // Loan.findAndCountAll()
  // Loan.count()
  })
  .then(function(result){
    let loans = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'loans/loansPages/';
    // res.send(loans);
    console.log(page);
    console.log(pages);
        // res.send("Math");
          res.render('loans',{
            title: 'Loans',
            loans: loans,
            pages: pages,
            link: link
          });
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/loansPages/:page', function(req, res, next) {
  //the limit of loans per page
  let limit = 6;
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset accordint to the page that is being chosen
  let offset = limit * (page - 1);
  Loan.findAndCountAll({
    include: [{ all: true }],
    offset: offset,
    limit: limit
  // Loan.findAndCountAll()
  // Loan.count()
  })
  .then(function(result){
    let loans = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'loans/loansPages/';
    // res.send(loans);
    console.log(page);
    console.log(pages);
  // res.send("Math");
    res.render('loans',{
      title: 'Loans',
      loans: loans,
      pages: pages,
      link: link,
      activePage: page
    });
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/checked_loans', function(req, res, next) {
  Loan.findAll({
    include: [{ all: true }],
    where: {
      returned_on: null
    }
  }).then(function(loans){
    res.render('loans/checked_loans',{loans: loans});
    // res.send(loans);
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/overdue_loans', function(req, res, next) {
  Loan.findAll({
    include: [{ all: true }]
  }).then(function(loans){
    res.render('loans/overdue_loans',{loans: loans});
    // res.send(loans);
  }).catch(function(error){
      res.send(500, error);
   });
});

// /* PUT Edit/change book details. PUT PUT PUT PUT PUT  */
// router.put('/:id', function(req, res, next){
//   Book.findById(req.params.id).then(function(book){
//     return book.update(req.body);
//   }).then(function(book){
//     res.redirect('/books/' + book.id);
//   }).catch(function(error){
//       console.log("there is a huge 500 error here");
//       res.status(500).send(error);
//    });
// });

router.get('/new_loan', function(req, res, next) {
  var books;
  var patrons;
  var currentDate = moment().format('YYYY/MM/DD');
  var returnDate = moment().add(7, 'd').format('YYYY-MM-DD');
  Book.findAll({
    include: [{ all: true }]
  }).then(function(results){
    books = results;
  }).then( Patron.findAll()
   ).then( function(results){
      patrons = results;
  }).then(function(){
      res.render('loans/new_loan', {
        books: books,
        patrons: patrons,
        cDate: currentDate,
        rDate: returnDate
      });
      // res.send(books);
    })
    // .catch(function(err){
    //   return next(err);
    // })
  // );
});

/* POST create article. POST POST POST POST POST */
router.post('/new_loan', function(req, res, next) {
  Loan.create(req.body).then(function(loan) {
    // res.redirect("/loans");
    res.redirect('new_loan');
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

router.get('/return_book/:id', function(req, res, next) {

  var currentDate = moment().format('YYYY/MM/DD');

  Loan.findAll({
    include: [{all: true}],
    where: {
      id: req.params.id
    }
  }).then(function(data){
      let bookInfo = JSON.parse(JSON.stringify(data));
      let loanCount = Object.keys(bookInfo).length;
      let returnBook = bookInfo[0];
      console.log(Object.keys(bookInfo).length);
    res.render('loans/return_book',{
      title: 'Return Book',
      loan: returnBook,
      returned_on: currentDate,
    });
    // res.send(bookInfo);
  }).catch(function(error){
      res.send(500, error);
   });
});


router.put('/return_book/:id', function(req, res, next){
  Loan.findById(req.params.id).then(function(loan){
    return loan.update(req.body);
  }).then(function(loan){
    res.redirect('/loans/');
    // res.send(req.body);
  }).catch(function(error){
      console.log("there is a huge 500 error here");
      res.status(500).send(error);
   });
});


module.exports = router;
