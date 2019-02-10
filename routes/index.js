var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The View' });
});

//get's second page
router.get('/new-page', function(req, res, next) {
  res.render('new-page', { title: 'new page' , categories: categories});
});

module.exports = router;
