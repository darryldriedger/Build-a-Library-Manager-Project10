'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loans = require("../models").Loans;
var Patrons = require("../models").Patrons;
var Patrons = require("../models").Tracking;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
