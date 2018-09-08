'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;

router.get('/', function(req, res, next) {
  Patron.findAll().then(function(patrons){
    res.render('patrons',{patrons: patrons});
  }).catch(function(error){
      res.send(500, error);
   });
});
// router.get('/new_patron', function(req, res, next) {
//   res.render('patrons/new_patron');
// });
// router.get('/patron_detail', function(req, res, next) {
//   res.render('patrons/patron_detail');
// });

router.get('/new_patron', function(req, res, next) {
  res.render('patrons/new_patron');
});

/* POST create article. POST POST POST POST POST */
router.post('/new_patron', function(req, res, next) {
  Patron.create(req.body).then(function(patron) {
    res.redirect("/patrons");
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

/* GET incividual book details GETiNDIV GETiNDIV GETiNDIV */
// router.get('/:id', function(req, res, next) {
//   Patron.findById(req.params.id).then(function(patron){
//     // res.render('patrons/patron_detail',{patron: patron});
//     res.send(patron);
//   }).catch(function(error){
//       res.send(500, error);
//    });
// });


//-------------------------------------------------------------
/* GET incividual book details GETiNDIV GETiNDIV GETiNDIV */
router.get('/:id', function(req, res, next) {
  Patron.findAll({
    include: [{ model: Loan, include: [{ model: Book }] }],
  where: {id: req.params.id}
  })
    .then(function(data){
      // var result  = JSON.parse(book);
      var patronInfo = JSON.parse(JSON.stringify(data));
      let patron = patronInfo[0];
      let loans = patron.Loans;
      // let book = loans[0].Book;
    res.render('patrons/patron_detail',{
      patron: patron,
      loans: loans,
      // book: book,
    });
        // res.send(bookInfo);
        // res.send(loans);
        // res.send(patron);
    // res.send(book);
    // res.send(loans[0].Patron);
    // res.send(book[0].loans);
    // res.send(JSON.parse(book));
    // res.send("this is great!");
    // console.log(JSON.stringify(book));
  }).catch(function(error){
      res.send(500, error);
      // res.send("this is great!");
      // res.status(500).send(body);
   });
});
//-------------------------------------------------------------



/* PUT Edit/change book details. PUT PUT PUT PUT PUT  */
router.put('/:id', function(req, res, next){
  Patron.findById(req.params.id).then(function(patron){
    return patron.update(req.body);
  }).then(function(patron){
    res.redirect('/patrons/' + patron.id);
  }).catch(function(error){
      console.log("there is a huge 500 error here");
      res.status(500).send(error);
   });
});
module.exports = router;
