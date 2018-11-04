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
  }).catch(function(err){
    // res.send(err.errors);
      if(err.name === "SequelizeValidationError") {
        var firstnameErr = [];
        var lastnameErr = [];
        var addressErr = [];
        var emailErr = [];
        var libraryIdErr = [];
        var zipcodeErr = [];

        for (var i=0; i<err.errors.length; i++) {
          if (err.errors[i].path === 'first_name'){
            firstnameErr.push(err.errors[i].message)
          } else if (err.errors[i].path === 'last_name'){
            lastnameErr.push(err.errors[i].message)
          } else if (err.errors[i].path === 'address'){
            addressErr.push(err.errors[i].message)
          } else if (err.errors[i].path === 'email'){
            emailErr.push(err.errors[i].message)
          } else if (err.errors[i].path === 'library_id'){
            libraryIdErr.push(err.errors[i].message)
          } else if (err.errors[i].path === 'zip_code'){
            zipcodeErr.push(err.errors[i].message)
          }
        }
        // res.send(err.errors);
      res.render('patrons/new_patron', {
        title: 'New Patron',
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        email: req.body.email,
        address: req.body.address,
        library_id: req.body.library_id,
        zip_code: req.body.zip_code,
        firstnameErr: firstnameErr,
        lastnameErr: lastnameErr,
        addressErr: addressErr,
        emailErr: emailErr,
        libraryIdErr: libraryIdErr,
        zipcodeErr: zipcodeErr
      });
      } else {
          return next(err);
        }
  });
  // .catch(function(error){
  //     res.send(500, error);
  //  });
});

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
  }).catch(function(error){
      res.send(500, error);
   });
});
//-------------------------------------------------------------



/* PUT Edit/change book details. PUT PUT PUT PUT PUT  */
router.put('/:id', function(req, res, next){
  Patron.findById(req.params.id).then(function(patron){
    return patron.update(req.body);
  }).then(function(patron){
    res.redirect('/patrons/');
    // res.redirect('/patrons/' + patron.id);
  }).catch(function(err){
      if(err.name === "SequelizeValidationError") {
        var errMessage = "Submit changes with valid data(First: 20chars, Last: 20chars, Add: 30chars, email:valid email, LibID: 10chars, Zip: valid Canadian zip)";
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
            errMessage: errMessage
          });
        }).catch(function(error){
            res.send(500, error);
         });
      }

    })
});
module.exports = router;
