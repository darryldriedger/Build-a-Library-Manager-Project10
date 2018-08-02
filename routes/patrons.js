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
router.get('/:id', function(req, res, next) {
  Patron.findById(req.params.id).then(function(patron){
    res.render('patrons/patron_detail',{patron: patron});
  }).catch(function(error){
      res.send(500, error);
   });
});
module.exports = router;
