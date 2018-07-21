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


//BOOKS
//BOOKS
//BOOKS

/* _____          _
 / ____|        | |
| |  __    ___  | |_
| | |_ |  / _ \ | __|
| |__| | |  __/ | |_
\_____|  \___|  \__|
*/
/* _____          _
 / ____|        | |
| |  __    ___  | |_
| | |_ |  / _ \ | __|
| |__| | |  __/ | |_
\_____|  \___|  \__|
*/
//* GET all Books listings. */
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
  console.log("one");
  res.render('book_detail');
});


//* GET Books listing. */
// router.get('/books', function(req, res, next) {
//   Book.findAll().then(function(books){
//     res.render('books',{books: books});
//   }).catch(function(error){
//       res.send(500, error);
//    });
// ;});
//  //   res.render('books/return_book');
//    router.get('/new_book', function(req, res, next) {
//      res.render('new_book');
//    });
//  //   res.render('books/overdue_books');
//    router.get('/overdue_books', function(req, res, next) {
//      res.render('overdue_books');
//    });
//  //   res.render('books/checked_books');
//    router.get('/checked_books', function(req, res, next) {
//      res.render('checked_books');
//    });
// //   res.render('books/book_detail');
//    router.get('/book_detail', function(req, res, next) {
//      res.render('book_detail');
//    });
//    router.get('/new_book', function(req, res, next) {
//      res.render('books/new_book');
//    });

/*
  _____                  _
 |  __ \                | |
 | |__) |   ___    ___  | |_
 |  ___/   / _ \  / __| | __|
 | |      | (_) | \__ \ | |_
 |_|      \___/  |___/  \__|

*//* POST create article. */
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
        // res.render("articles/new", {article: Article.build(req.body), errors: error.errors, title: "New Article"})
        console.log("error");
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
;});

// router.post('/books/new_book', function(req, res, next) {
//   Book.create(req.body).then(function(book) {
//     res.redirect("/books");
//   }).catch(function(error){
//       if(error.name === "SequelizeValidationError") {
//         // res.render("articles/new", {article: Article.build(req.body), errors: error.errors, title: "New Article"})
//         console.log("error");
//       } else {
//         throw error;
//       }
//   }).catch(function(error){
//       res.send(500, error);
//    });
// ;});


/*
 _____            _
|  __ \          | |
| |__) |  _   _  | |_
|  ___/  | | | | | __|
| |      | |_| | | |_
|_|       \__,_|  \__|
*/
/* PUT update book detail. */
// router.put("/:id", function(req, res, next){
//   Book.findById(req.params.id).then(function(bookDetail){
//     return bookDetail.update(req.body);
//   }).then(function(bookDetail){
//     // console.log("we ran the PUT");
//     res.redirect('/books');
//   }).catch(function(error){
//       if(error.name === "SequelizeValidationError") {
//         console.log("there was a huge error");
//         // res.render("articles/edit", {article: article, errors: error.errors, title: "Edit Article"})
//       } else {
//         throw error;
//       }
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });

router.put('/book_detail/:id', function(req, res, next){
  Book.findById(req.params.id).then(function(book){
      console.log("three");
    return book.update(req.body);
  }).then(function(book){
  console.log(book.id);
    // res.redirect('/book_detail' + '/' + book.id);
    res.redirect('/book_detail/' + book.id);
  }).catch(function(error){
      console.log("there is a huge 500 error here");
      res.send(500, error);
   });
});

// /*
//  _____          _       _____               _   _
// / ____|        | |     |_   _|             | | (_)
// | |  __    ___  | |_      | |    _ __     __| |  _  __   __
// | | |_ |  / _ \ | __|     | |   | '_ \   / _` | | | \ \ / /
// | |__| | |  __/ | |_     _| |_  | | | | | (_| | | |  \ V /
// \_____|  \___|  \__|   |_____| |_| |_|  \__,_| |_|   \_/
// */

// GET incividual book details

//------> this findall for book detail was replaced by the find by id below
// router.get('/book_detail/:id', function(req, res, next) {
//   Book.findAll().then(function(bookDetail){
//     console.log("this is the book detail title");
//     console.log(bookDetail[6]);
//     res.render('book_detail',{bookDetail: bookDetail});
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });
// router.get('/:id', function(req, res, next) {
//   Book.findAll({
//     include: [{ model: Loan, include: [{ model: Patron }] }],
//     where: { id: req.params.id }
//   })
//   .then(function(bookdetails){
//
//     var loansdata = JSON.parse(JSON.stringify(bookdetails));
//
//     if (bookdetails) {
//       res.render('partials/bookdetail', {
//         title: 'Book Details',
//         book: loansdata[0],
//         loans: loansdata[0].Loans
//       });
//     } else {
//       err.status == 404;
//       return next(err);
//     }
//
//   }).catch(function(err){
//     return next(err);
//   });
// });
//------> Find by id to retrieve specific book detail
router.get('/book_detail/:id', function(req, res, next) {
  Book.findById(req.params.id).then(function(bookDetail){
      console.log("two");
    res.render('book_detail',{bookDetail: bookDetail});
  }).catch(function(error){
      res.send(500, error);
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
