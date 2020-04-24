'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;
var Qaform = require("../models").Qaforms;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
  //the limit of loans per page
let limit = 5;
let pageId = 'Qaform'


router.get('/', function(req, res, next) {
  res.render('qaforms/',{title: 'New Form'});
});
router.get('/new_form', function(req, res, next) {
    res.render('qaforms/new_form',{title: 'New Form'});
  });


module.exports = router;
