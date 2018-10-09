var express = require('express');
var router = express.Router();
// var Profile = require('../models/Profile');

// import controller 
var profile_controller = require('../controllers/profile-controller');

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
    var json = profile_controller.push(req.body, (profile) => {
        res.json(profile);
    });
});

router.get('/manual', (req, res, next) => {
    res.render('pages/influencers/manual', {title: "Help"});
})

router.get('/home', (req, res, next) => {
    res.render('views/pages/influencers/home');
});

module.exports = router;