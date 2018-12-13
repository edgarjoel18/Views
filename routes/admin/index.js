var express = require('express');
var router = express.Router();
var articlesRouter = require('./articles');

router.use('/articles', articlesRouter);

router.get('/', function(req, res, next) {
  res.redirect('/admin/articles');
});

module.exports = router;
