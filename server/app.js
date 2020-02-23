var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(Session);
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

let url = "mongodb://localhost:27017/dalhav";
mongoose.connect(url,{useNewUrlParser: true});

var store = new MongoDBStore({
  uri: url,
  collection: 'sessions'
});
store.on('error',function(error){
  console.log(error);
});
app.use(Session({
  secret:'dalhav',
  resave:false,
  saveUninitialized:true,
  rolling:true,
  cookie:{maxAge:1000*60*60},
  store: store
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('connect-history-api-fallback')());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/login', loginRouter);
app.use('/api/look',require('./routes/look'));
app.use('/api/logout',require('./routes/logout'));
app.use('/api/signup',require('./routes/signup'));
app.use('/api/confirmEmail',require('./routes/confirm'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
