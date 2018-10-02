'use strict';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require("../models").Loan;
var Patron = require("../models").Patron;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
  //the limit of loans per page
let limit = 5;
let pageId = 'patrons'

router.get('/', function(req, res, next) {
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset accordint to the page that is being chosen
  let offset = limit * (page - 1);
  Patron.findAndCountAll({
    offset: 0,
    limit: limit
  })
  .then(function(result){
    let patrons = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'patrons/patronsPages/';
        // res.send(patrons);
          res.render('patrons',{
            title: 'Patrons',
            pageId: pageId,
            patrons: patrons,
            pages: pages,
            link: link
          });
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/patronsPages/:page', function(req, res, next) {
  // This will set the page number according to the page reference in the parameters
  let page = req.params.page;
  // Sets the offset accordint to the page that is being chosen
  let offset = limit * (page - 1);
  Patron.findAndCountAll({
    offset: offset,
    limit: limit
  })
  .then(function(result){
    let patrons = result.rows;
    let pages = Math.ceil(result.count / limit);
    let link = 'patrons/patronsPages/';
  // res.send(patrons);
    res.render('patrons',{
      title: 'Patrons',
      pageId: pageId,
      patrons: patrons,
      pages: pages,
      link: link,
      activePage: page
    });
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/search/:query', function(req, res, next) {
  var query = req.params.query;
  Patron.findAll({
    where: {
      $or: [
        { 'first_name': { [Op.like]: '%' + query + '%' } },
        { 'last_name': { [Op.like]: '%' + query + '%' } },
        { 'library_id': { [Op.like]: '%' + query + '%' } },
        { 'email': { [Op.like]: '%' + query + '%' } },
        { 'address': { [Op.like]: '%' + query + '%' } },
        { 'zip_code': { [Op.like]: '%' + query + '%' } },
      ]
    }
  }).then(function(patrons){
    res.render('patrons',{patrons: patrons,title: 'Searched patrons'});
  }).catch(function(error){
      res.send(500, error);
    })
});

router.get('/new_patron', function(req, res, next) {
  res.render('patrons/new_patron',{title: 'New Patron'});
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
