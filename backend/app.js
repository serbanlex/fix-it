var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerSpecs.json')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const db = require("./models");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// loggers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// api docs
app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
);


db.sequelize
    .sync({ force: true }).then( () => {
      console.log("Synced (created) db models")
    })
    .catch ( (error) => {
      console.error('Unable to sync models:', error);
    })


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
