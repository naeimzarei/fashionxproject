var express = require('express');
var moment = require('moment');
var router = express.Router();

var signup_controller = require('../controllers/signup-controller');
var credentials_controller = require('../controllers/credentials-controller');
var post_controller = require('../controllers/post-controller');

router.get('/', (req, res, next) => {
    res.render('pages/influencers/login', { title: 'Login', errors: '' });
});

router.get('/login', (req, res, next) => {
    res.render('pages/influencers/login', { title: 'Login', errors: '' });
});

router.get('/signup', (req, res, next) => {
    res.render('pages/influencers/signup', { title: 'Sign Up', errors: ''});
});

router.post('/signup', async (req, res, next) => {
    var errors = signup_controller.validate(req.body);

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        var result = await signup_controller.signup(req.body);
        res.json(result); 
    } else {
        res.render('pages/influencers/signup', { title: 'Sign Up', errors: errors});
    }
});

router.post('/login', async(req, res, next) => {
    var result = await credentials_controller.authenticate(req.body);
    res.json(result);
});


router.get('/manual', (req, res, next) => {
    res.render('pages/influencers/manual', {title: "Help"});
})

router.get('/home', async(req, res, next) => {
    var posts = await post_controller.findAll('test@example.com');
    res.render('pages/influencers/home', { title: "Home", posts: posts, moment: moment });
});

module.exports = router;