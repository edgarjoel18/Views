var express = require('express');
var router = express.Router();
var models = require('../../models');
var moment = require('moment');

router.get('/', function(req, res, next) {
  models.Article.all().then(function(articles) {
    res.render('admin/articles/index', {
      layout: 'admin/layout',
      title: 'Articles',
      articles: articles,
      moment: moment,
      dateFormat: 'YYYY-MM-DD HH:mma'
    });
  });
});

module.exports = router;
