var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var mainRouter = require('./routes/main');
require('dotenv').config();

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login',loginRouter);
app.use('/main',mainRouter);

//db
try{
mongoose.connect(process.env.MONGOURL);
console.log("db connected successfully")
}
catch(err){
 console.log('db error',err)
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(`
    <h1>Something went wrong</h1>
    <p>${err.message}</p>
  `);
});

module.exports = app;
