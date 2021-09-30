var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// testing new route 
router.get('/cool', function(req, res, next) {
  res.send('<h1>Very cool!!</h1>');
});

module.exports = router;
