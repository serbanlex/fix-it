var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swaggerSpecs.json')
var routes = require('./presentation/routes');
const db = require("./infrastructure/models");
const path = require('path');
var cors = require('cors')

require('dotenv').config({ path: path.join(__dirname, 'config', '.env') })

var app = express();

// loggers
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// routers
app.use("/", routes);

// api docs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs)
);

// enable cors for the mobile app (frontend) running on a different port
//app.use(cors())
// db table syncing
db.sequelize
  .sync({ force: false }).then(() => {
    console.log("Synced (created) db models")
  })
  .then(() => {
    console.log("App started on localhost:3000, docs available on localhost:3000/docs ")
  })
  .catch((error) => {
    console.error('Unable to sync models:', error);
  })


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("Accessed a non-existent route: " + req.url)
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  res.status(500).json({ message: 'Something went wrong' });
});

const port = 8000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});

module.exports = app;
