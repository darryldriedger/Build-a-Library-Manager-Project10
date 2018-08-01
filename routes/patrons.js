'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loans = require("../models").Loans;
var Patrons = require("../models").Patrons;

router.get('/', function(req, res, next) {
  Book.findAll().then(function(books){
    res.render('patrons');
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
module.exports = router;
