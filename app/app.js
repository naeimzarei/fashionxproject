// parsers 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

// config 
var config = require('./config/config');

// define routes 
var indexRouter = require('./routes/index');
var templateRouter = require('./routes/template');
var usersRouter = require('./routes/users');
var influencersRouter = require('./routes/influencers');

// initialize express app
var app = express();

// controllers
var authenticate_controller = require('./controllers/authenticate-controller');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up public directory and URL parsers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup sessions 
app.use(require('express-session')({ 
  secret: config.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false
}));

// setup passport js
app.use(passport.initialize());
app.use(passport.session());

// passport.js local strategy setup 
authenticate_controller.strategy();

// set routes 
app.use('/', indexRouter);
app.use('/template', templateRouter);
app.use('/users', usersRouter);
app.use('/influencers', checkAuth, influencersRouter);

function checkAuth(req, res, next) {
  if (req.originalUrl !== '/influencers/login' && !req.user) {
    return res.redirect('/influencers/login');
  } else {
    //authenticate user
    next();
  } 
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
