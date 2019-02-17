var express = require('express');
var router = express.Router();
var models = require('../../models');
var moment = require('moment');
var uuid = require('uuid/v4');
var mime = require('mime-types');
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');
var AWS = require('aws-sdk');

router.get('/', function(req, res, next) {
  models.Article.all({
    include: ['category', 'user'],
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

function handlePicture(req, article, callback) {
  if (req.files && req.files.picture) {
    const key = `articles/picture/${uuid()}/original.${mime.extension(req.files.picture.mimetype)}`;
    if (process.env.AWS_S3_BUCKET) {
      var s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_BUCKET_REGION
      });
      if (article) {
        //// delete existing picture, if any
        s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: article.pictureUrl.substring(process.env.AWS_S3_BASE_URL.length + 1)
        }, function(err, data) {
          if (err) {
            console.log(err);
          }
        });
      }
      //// store in S3
      s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: req.files.picture.data,
        ACL: 'public-read'
      }, function(err, data) {
        if (err) {
          console.log(err);
          callback();
        } else {
          callback(`${process.env.AWS_S3_BASE_URL}/${key}`);
        }
      });
    } else {
      if (article) {
        //// delete existing picture, if any
        if (article.pictureUrl && article.pictureUrl != '') {
          const dest = `${path.resolve(__dirname, '../../public')}${article.pictureUrl}`;
          rimraf(path.dirname(dest), function(err) {
            console.log(err);
          });
        }
      }
      //// store in local file system for development, in public
      const dest = `${path.resolve(__dirname, '../../public/uploads')}/${key}`;
      mkdirp.sync(path.dirname(dest));
      req.files.picture.mv(dest, function(err) {
        if (err) {
          console.log(err);
          callback();
        } else {
          callback(`/uploads/${key}`);
        }
      });
    }
  } else {
    callback();
  }
}

router.post('/', function(req, res, next) {
  handlePicture(req, null, function(pictureUrl) {
    models.Article.create({
      title: req.body.title,
      body: req.body.body,
      sourceUrl: req.body.sourceUrl,
      pictureUrl: pictureUrl,
      publishedAt: req.body.publishedAt == '' ? null : req.body.publishedAt,
      categoryId: req.body.categoryId,
      userId: req.user.id,
    }).then(function(article) {
      req.flash('info', 'Article created!');
      res.redirect(`/admin/articles/${article.id}/edit`);
    });
  });
});

router.get('/new', function(req, res, next) {
  models.Category.all().then(function(categories) {
    res.render('admin/articles/new', {
      layout: 'admin/layout',
      title: 'New Article',
      article: models.Article.build(),
      categories: categories,
      moment: moment
    });
  });
});

router.get('/:id/edit', function(req, res, next){
  models.Category.all().then(function(categories) {
    models.Article.findById(req.params.id).then(function(article){
      res.render('admin/articles/edit', {
        layout: 'admin/layout',
        title: 'Edit Article',
        article: article,
        categories: categories,
        moment: moment
      });
    });
  });
});

router.patch('/:id', function(req, res, next) {
  models.Article.findById(req.params.id).then(function(article) {
    handlePicture(req, article, function(pictureUrl) {
      article.update({
        title: req.body.title,
        body: req.body.body,
        sourceUrl: req.body.sourceUrl,
        pictureUrl: pictureUrl,
        publishedAt: req.body.publishedAt == '' ? null : req.body.publishedAt,
        categoryId: req.body.categoryId,
      }) .then(function(){
        req.flash('info', 'Article saved!');
        res.redirect(`/admin/articles/${article.id}/edit`);
      });
    });
  });
});

module.exports = router;
