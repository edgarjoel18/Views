var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var articlesRouter = require('./routes/articles');
var regristrationsRouter = require('./routes/regristrations');
var session = require('cookie-session');
var flash = require('connect-flash');
var passport = require('passport');
var sessionsRouter= require('./routes/session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({name: 'session', secret: 'changeme'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib/bootstrap',express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/lib/jquery',express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use(function(req,res,next){
    res.locals.flash = req.flash();
    res.locals.current_user = req.user;
    next();
})

function requireAdmin(req,res,next){
  if (req.user){
    if (req.user.admin){
      next();
    } else{
      req.flash('error', "Not allowed to see this page");
      res.redirect('/');
    }
  }else{
    req.flash('error', 'You are not logged in as an admin');
    res.redirect('/login');
    }

}


app.use('/', indexRouter);
app.use('/admin', requireAdmin);
app.use('/admin', adminRouter);
app.use('/articles', requireAdmin);
app.use('/articles', articlesRouter);
app.use('/posts', postsRouter);
app.use('/register', regristrationsRouter);
app.use('/users', usersRouter);

app.use('/login',sessionsRouter);
app.use('/logout', function(req,res,next){
  req.logout();
  req.flash('info', 'You have been logged out');
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.title = "Error";
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
