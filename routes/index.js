var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The View' });
  




});
//get's second page
router.get('/new-page', function(req, res, next) {
  res.render('new-page', { title: 'new page' });
});

module.exports = router;
