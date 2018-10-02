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
    console.log(req.body);
    signup_controller.signup();
});

router.get('/home', (req, res, next) => {
    res.render('views/pages/influencers/home');
});

module.exports = router;