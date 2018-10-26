var express = require('express');
var moment = require('moment');
var router = express.Router();
var util = require('../util/util');

var signup_controller = require('../controllers/signup-controller');
var credentials_controller = require('../controllers/credentials-controller');
var post_controller = require('../controllers/post-controller');

var VALIDATION_ERRORS = util.VALIDATION_ERRORS;

router.get('/', (req, res, next) => {
    res.render('pages/influencers/login', { title: 'Login', errors: '', fields: ''});
});

router.get('/login', (req, res, next) => {
    res.render('pages/influencers/login', { title: 'Login', errors: '', fields: ''});
});

router.get('/signup', (req, res, next) => {
    res.render('pages/influencers/signup', { title: 'Sign Up', errors: '', fields: ''});
});

router.post('/signup', async (req, res, next) => {
    var errors = await signup_controller.validate(req.body);

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        var posts = await post_controller.findAll(req.body.email);
        res.render('pages/influencers/home', { title: "Home", posts: posts, moment: moment });
    } else {
        res.render('pages/influencers/signup', { title: 'Sign Up', errors: errors, fields: req.body});
    }
});

router.post('/login', async(req, res, next) => {
    var result = await credentials_controller.authenticate(req.body);
    if(result){
        var posts = await post_controller.findAll(req.body.email);
        res.render('pages/influencers/home', { title: "Home", posts: posts, moment: moment });
    }else{
        res.render('pages/influencers/login', {title: "Login", errors: {'email': VALIDATION_ERRORS['EMAIL_DOES_NOT_EXIST']}, fields: ''})
    }
});


router.get('/manual', (req, res, next) => {
    res.render('pages/influencers/manual', {title: "Help"});
})

// router.get('/home', async(req, res, next) => {
//     var posts = await post_controller.findAll();
//     res.render('pages/influencers/home', { title: "Home", posts: posts, moment: moment });
// });

module.exports = router;