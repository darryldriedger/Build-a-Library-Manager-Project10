var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var methodOverride = require('method-override');
var moment = require('moment');
const Sequelize = require('sequelize');
const chalk = require('chalk');
// const op = Sequelize.Op;
// const Op = Sequelize.Op;

// app.locals.moment = require('moment');

//====ROUTES===============================
var homeRoute = require('./routes/index');
var booksRoute = require('./routes/books');
var loansRoute = require('./routes/loans');
var patronsRoute = require('./routes/patrons');
//====ROUTES===============================

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use(mainRoutes);
// app.use('/book_detail', testRouter);
// app.use('/users', usersRouter);

//====useROUTES===============================
app.use('/', homeRoute);
app.use('/books', booksRoute);
app.use('/loans', loansRoute);
app.use('/patrons', patronsRoute);
//====useROUTES===============================


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
