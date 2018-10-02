var express = require('express');
var router = express.Router();

// import controller 
var signup_controller = require('../controllers/signup-controller');

router.get('/', (req, res, next) => {
    res.render('pages/influencers/login', { title: 'Login' });
});

router.get('/login', (req, res, next) => {
    res.render('pages/influencers/login', { title: 'Login' });
});

router.get('/signup', (req, res, next) => {
    res.render('pages/influencers/signup', { title: 'Sign Up' });
});

router.post('/signup', (req, res, next) => {
    signup_controller.validate(req.body);
});

router.get('/manual', (req, res, next) => {
    res.render('pages/influencers/manual', {title: "Help"});
})

router.get('/home', (req, res, next) => {
    res.render('views/pages/influencers/home');
});

module.exports = router;