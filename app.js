var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const findEdmRouter = require('./routes/find-edm')

const EdmEvent = require('./models/edmevent');
const fetchZouk = require('./web-scraping/fetch-zouk')
const fetchHakassanGroup = require('./web-scraping/fetch-hakassan-group')
const fetchWynn = require('./web-scraping/fetch-wynn')

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/find-edm', findEdmRouter);

app.get('/add-edm-bulk-events', (req, res) => {
  fetchDataAndUpdateCollection()

  async function fetchDataAndUpdateCollection() {
    try {
      const zoukEdmEvents = await fetchZouk.fetchZoukEDMEvents()
      const hakkasanGroupEdmEvents = await fetchHakassanGroup.getHakassanGroupEDMEvents()
      const wynnEdmEvents = await fetchWynn.fetchWynnGroupEDMEvents()
      const _collectionDeleted = await EdmEvent.deleteMany()
      const resultFromCollection = await EdmEvent.insertMany([...zoukEdmEvents, ...hakkasanGroupEdmEvents, ...wynnEdmEvents])
      res.send(resultFromCollection)
    } catch(error) {
      console.log(error)
    }
  }
});

app.get('/find-all-edm-events', (req, res) => {
  EdmEvent.find()
  .then(result => {res.send(result)})
  .catch(error => console.log(error))
});

app.get('/delete-all-edm-events', (req, res) => {
  EdmEvent.deleteMany()
  .then(result => {res.send(result)})
  .catch(error => console.log(error))
})

app.get('/all-edm-events', (req, res) => {
  EdmEvent.find()
  .then(result => {res.send(result)})
  .catch(error => console.log(error))
})

app.get('/one-edm-event', (req, res) => {
  EdmEvent.findById('61514cc81f188988c357c167')
  .then(result => {res.send(result)})
  .catch(error => console.log(error))
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
