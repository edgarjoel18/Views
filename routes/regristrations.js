var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');

//Get regristration form

router.get('/', function(req, res, next) {
    res.render('regristrations/new', { title: 'Register' });
  });

//post the regristation

router.post('/', function(req,res,next){
    bcrypt.hash(req.body.password,10).then(function(hash){
        models.User.create({
            login: req.body.login,
            hashed_password:hash

        }).then(function(user){
            res.redirect('/');
        });

    });

});




module.exports = router;
