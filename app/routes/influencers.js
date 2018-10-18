var express = require('express');
var router = express.Router();

var signup_controller = require('../controllers/signup-controller');
var credentials_controller = require('../controllers/credentials-controller');

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

router.get('/home', (req, res, next) => {
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
});

module.exports = router;