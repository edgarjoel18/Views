var models = require('../../models');
var moment = require('moment');
var uuid = require('uuid/v4');
var mime = require('mime-types');
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');
var AWS = require('aws-sdk');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.Audio.all({
    include: ['user'],
    order: [['createdAt', 'DESC']]
  }).then(function(music) {
    res.render('audio/index', {
      title: 'uploads',
      audio: music,
      moment: moment,
      dateFormat: 'YYYY-MM-DD HH:mm'
    });
  });
});

function uploadMusic(req, audio, callback) {
  if (req.files && req.files.music) {
    const key = `audio/music/${uuid()}/original.${mime.extension(req.files.music.mimetype)}`;
    if (process.env.AWS_S3_BUCKET) {
      var s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_BUCKET_REGION
      });
      if (audio && audio.audioUrl && audio.audioUrl != '') {
        //// delete existing picture, if any
        s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: audio.audioUrl.substring(process.env.AWS_S3_BASE_URL.length + 1)
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
        Body: req.files.music.data,
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
      if (audio) {
        //// delete existing picture, if any
        if (audio.audioUrl && audio.audioUrl != '') {
          const dest = `${path.resolve(__dirname, '../../public')}${audio.audioUrl}`;
          rimraf(path.dirname(dest), function(err) {
            console.log(err);
          });
        }
      }
      //// store in local file system for development, in public
      const dest = `${path.resolve(__dirname, '../../public/uploads')}/${key}`;
      mkdirp.sync(path.dirname(dest));
      req.files.music.mv(dest, function(err) {
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

router.get('/new', function(req, res, next) {
    res.render('audio/new', {
      title: 'New Music Upload',
      audio: models.Audio.build(),
      moment: moment
    });

});
router.post('/', function(req, res, next) {
  uploadMusic(req, null, function(audioUrl) {
    models.Audio.create({
      title: req.body.title,
      body: req.body.body,
      audioUrl: audioUrl,
      userId: req.user.id,
    }).then(function(audio) {
      req.flash('info', 'Song Uploaded!');
      res.redirect(`/audioUploads`);
    });
  });
});


//edit the upload to delete
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
module.exports = router;
