var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET lists of articles */
router.get('/', function(req, res, next) {
    models.Article.all().then(function(posts){
        res.render('articles/index', { title: 'Articles', articles: posts }); 
    });
 });
// post to create a new post
router.post('/', function(req, res, next){
    models.Article.create({
        picture: req.body.picture,
        publishedAt: req.body.publishedAt,
        title: req.body.title,
        body: req.body.body,
        sourceUrl: req.body.sourceUrl


    }).then(function(post){
        res.redirect(`/articles/${post.id}`)
    });
});

// create a new post
router.get('/new', function(req, res, next){
 res.render('articles/new',{ title: 'New Article' });
});
 


//Get another articles
 router.get('/:id', function(req, res, next){
    models.Article.findById(req.params.id).then(function(article){
        res.render('articles/show', {
            title: 'Show article',
            article: article
        });
    });
});
//Get editing form
router.get('/:id/edit', function(req, res, next){
    models.Article.findById(req.params.id).then(function(article){
        res.render('articles/edit', {
            title: 'Edit article',
            article: article
        });
    });
});
// Patch the post
router.patch('/:id', function(req, res, next){
    models.Article.findById(req.params.id).then(function(article){
        article.update({ 
            title: req.body.title,
            body: req.body.body

        }) .then(function(){
            res.redirect(`/articles/ ${article.id}`);
        });
    });
});

//Deleting posts
router.delete('/:id', function(req, res, next){
    models.Article.findById(req.params.id).then(function(article){
        article.destroy().then(function(){
            res.redirect('/articles');


        });
       
    });
});


module.exports = router;
