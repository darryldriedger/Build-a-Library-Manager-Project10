'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//Below is the limit of results per page
let limit = 10;

//LOANS MAIN PAGE GET
router.get('/', function(req, res, next) {
  //the limit of loans per page
  // let limit = 6;
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
    // res.send(result);
    console.log(page);
    console.log(pages);
        // res.send(loans);
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
//LOANS PAGES GET
router.get('/loansPages/:page', function(req, res, next) {
  //the limit of loans per page
  // let limit = 6;
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
//CHECKED LOANS GET
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
//OVERDUE LOANS GET
router.get('/overdue_loans', function(req, res, next) {
  // var currentDate = new Date();
  var currentDate = moment().format('YYYY-MM-DD');
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
  }).then(function(loans){
    res.render('loans/overdue_loans',{
      loans: loans
    });
    // res.send(moment().format('YYYY*MM*DD'));
  }).catch(function(error){
      res.send(500, error);
   });
});

//NEW LOAN GET
router.get('/new_loan', function(req, res, next) {
  var books, numBooks;
  var patrons;
  // var currentDate = moment().format('YYYY/MM/DD');
  // var returnDate = moment().add(7, 'd').format('YYYY/MM/DD');

  Book.findAll({
    include: [{ all: true }],
    where:{
      loan_status: {
       [Op.eq]: null
      }
    }
  })
    .then(function(results){
      books = results;
      numBooks = books.length;
      console.log(numBooks);
    }).then(
    Patron.findAll({
      include: [{ all: true }]
    }).then( function(results){
      patrons = results;
    }).then(function(){
      res.render('loans/new_loan', {
        books: books,
        numBooks: numBooks,
        patrons: patrons,
        loaned_on: moment().format('YYYY-MM-DD'),
        return_by: moment().add(7, 'days').format('YYYY-MM-DD')
        // loaned_on: moment().format('YYYY-MM-DD'),
        // return_by: moment().add(7, 'days').format('YYYY-MM-DD')
      });
      // res.send(books);
    })
    // .catch(function(err){
    //   return next(err);
    // })
  );
});
//NEW LOAN POST
router.post('/new_loan', function(req, res, next) {
  Loan.create(req.body).then(function(loan) {
    Book.findById(req.body.book_id).then(function(book){
      return book.update({loan_status: "not null"},{
        where:{id: req.body.book_id}
      });
    })
  }).then(function(){
    // res.send(req.body)
    res.redirect("/loans");
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        console.log("error");
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
});

//RETURN BOOK GET
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
//RETURN BOOK PUT
router.put('/return_book/:id', function(req, res, next){
  Loan.findById(req.params.id).then(function(loan){
    Book.findById(loan.book_id).then(function(book){
      return book.update({loan_status: null},{
        where:{id: req.body.book_id}
      });
    })
    return loan.update(req.body);
  }).then(function(loan){
    res.redirect('/loans/');
    // res.send(loan);
  }).catch(function(error){
      console.log("there is a huge 500 error here");
      res.status(500).send(error);
   });
});

module.exports = router;
