var express = require('express');
var router = express.Router();
var articlesRouter = require('./articles');
var categoriesRouter = require('./categories');

router.use('/articles', articlesRouter);
router.use('/categories', categoriesRouter);

router.get('/', function(req, res, next) {
  res.redirect('/admin/articles');
});

module.exports = router;
