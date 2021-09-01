var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const dbconfig = require('./config/mysql.js');


var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var profileRouter = require('./routes/profile');
var pageRouter = require('./routes/page');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(session({
  secret: 'ABCD1234ABAB!@',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore(dbconfig)
}));



app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/profile', profileRouter);
app.use('/page', pageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;