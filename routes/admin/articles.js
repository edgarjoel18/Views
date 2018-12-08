var express = require('express');
var router = express.Router();
var models = require('../../models');
var moment = require('moment');

router.get('/', function(req, res, next) {
  models.Article.all({
    include: ['user'],
    order: [['createdAt', 'DESC']]
  }).then(function(articles) {
    res.render('admin/articles/index', {
      layout: 'admin/layout',
      title: 'Articles',
      articles: articles,
      moment: moment,
      dateFormat: 'YYYY-MM-DD HH:mm'
    });
  });
});

router.post('/', function(req, res, next) {
  models.Article.create({
    title: req.body.title,
    body: req.body.body,
    sourceUrl: req.body.sourceUrl,
    pictureUrl: req.body.pictureUrl,
    publishedAt: req.body.publishedAt == '' ? null : req.body.publishedAt,
    userId: req.user.id
  }).then(function(article) {
    req.flash('info', 'Article created!');
    res.redirect(`/admin/articles/${article.id}/edit`);
  });
});

router.get('/new', function(req, res, next) {
  res.render('admin/articles/new', {
    layout: 'admin/layout',
    title: 'New Article',
    article: models.Article.build(),
    moment: moment
  });
});

router.get('/:id/edit', function(req, res, next){
  models.Article.findById(req.params.id).then(function(article){
    res.render('admin/articles/edit', {
      layout: 'admin/layout',
      title: 'Edit Article',
      article: article,
      moment: moment
    });
  });
});

router.patch('/:id', function(req, res, next){
  models.Article.findById(req.params.id).then(function(article) {
    article.update({
      title: req.body.title,
      body: req.body.body,
      sourceUrl: req.body.sourceUrl,
      pictureUrl: req.body.pictureUrl,
      publishedAt: req.body.publishedAt == '' ? null : req.body.publishedAt
    }) .then(function(){
      req.flash('info', 'Article saved!');
      res.redirect(`/admin/articles/${article.id}/edit`);
    });
  });
});

module.exports = router;
