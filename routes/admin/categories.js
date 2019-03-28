var express = require('express');
var router = express.Router();
var models = require('../../models');
var moment = require('moment');

router.get('/', function(req, res, next) {
  models.Category.all({ // call to
    order: ['name']
  }).then(function(categories) {
    res.render('admin/categories/index', {
      layout: 'admin/layout',
      title: 'Categories',
      categories: categories,
      moment: moment,
      dateFormat: 'YYYY-MM-DD HH:mm'
    });
  });
});

router.post('/', function(req, res, next) {
  models.Category.create({
    name: req.body.name,
  }).then(function(category) {
    req.flash('info', 'Category created!');
    res.redirect(`/admin/categories/${category.id}/edit`);
  });
});

router.get('/new', function(req, res, next) {
  res.render('admin/categories/new', {
    layout: 'admin/layout',
    title: 'New Category',
    category: models.Category.build(),
  });
});

router.get('/:id/edit', function(req, res, next){
  models.Category.findById(req.params.id).then(function(category){
    res.render('admin/categories/edit', {
      layout: 'admin/layout',
      title: 'Edit Category',
      category: category,
      moment: moment
    });
  });
});

router.patch('/:id', function(req, res, next){
  models.Category.findById(req.params.id).then(function(category) {
    category.update({
      name: req.body.name,
    }) .then(function(){
      req.flash('info', 'Category saved!');
      res.redirect(`/admin/categories/${category.id}/edit`);
    });
  });
});

router.delete('/:id', function(req, res, next) {
  models.Category.findById(req.params.id).then(function(category) {
    category.destroy().then(function(){
      req.flash('info', 'Category deleted.');
      res.redirect('/admin/categories');
    }).catch(function(err) {
      if (err.name == 'SequelizeForeignKeyConstraintError') {
        req.flash('error', 'Category is still being used. Edit articles using this category (switch to another category) before deleting.');
        res.redirect(`/admin/categories/${req.params.id}/edit`);
      }
    });
  });
});

module.exports = router;
