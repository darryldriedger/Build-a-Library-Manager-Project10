var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');//, { title: 'Library Manager Project 10' }
});
router.get('/all_books', function(req, res, next) {
  res.render('books/all_books');
});
router.get('/all_patrons', function(req, res, next) {
  res.render('patrons/all_patrons');
});
router.get('/all_loans', function(req, res, next) {
  res.render('loans/all_loans');
});
// router.get('/checked_books', function(req, res, next) {
//   res.render('books/checked_books');
// });


module.exports = router;
