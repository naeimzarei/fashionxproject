var express = require('express');
var moment = require('moment');
var router = express.Router();

var signup_controller = require('../controllers/signup-controller');
var credentials_controller = require('../controllers/credentials-controller');
var post_controller = require('../controllers/post-controller');

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
        await signup_controller.signup(req.body);
        const posts = [
            {
                id: 1,
                title: 'Title A',
                date: '12/12/12',
                img_url: 'https://via.placeholder.com/150x150',
                clicks: 0
            },
            {
                id: 2,
                title: 'Title B',
                date: '12/12/12',
                img_url: 'https://via.placeholder.com/150x150',
                clicks: 15
            },
            {
                id: 3,
                title: 'Title C',
                date: '12/12/12',
                img_url: 'https://via.placeholder.com/150x150',
                clicks: 61
            }
        ];
        res.render('pages/influencers/home', {title: "Home", posts: posts}); 
    } else {
        res.render('pages/influencers/signup', { title: 'Sign Up', errors: errors, fields: req.body});
    }
});

router.post('/login', async(req, res, next) => {
    var result = await credentials_controller.authenticate(req.body);
    if(result){
        const posts = [
            {
                id: 1,
                title: 'Title A',
                date: '12/12/12',
                img_url: 'https://via.placeholder.com/150x150',
                clicks: 0
            },
            {
                id: 2,
                title: 'Title B',
                date: '12/12/12',
                img_url: 'https://via.placeholder.com/150x150',
                clicks: 15
            },
            {
                id: 3,
                title: 'Title C',
                date: '12/12/12',
                img_url: 'https://via.placeholder.com/150x150',
                clicks: 61
            }
        ];
        res.render('pages/influencers/home', {title: "Home", posts: posts});    
    }else{
        res.render('pages/influencers/login', {title: "Login", errors: {'email': 'Incorrect email or password. Please try again or Sign Up'}})
    }
});


router.get('/manual', (req, res, next) => {
    res.render('pages/influencers/manual', {title: "Help"});
})

router.get('/home', async(req, res, next) => {
    var posts = await post_controller.findAll('test@example.com');
    res.render('pages/influencers/home', { title: "Home", posts: posts, moment: moment });
});

module.exports = router;