var express = require('express');
var router = express.Router();
// var Profile = require('../models/Profile');

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
    // const data = {
    //     first_name: req.body.first_name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     age: req.body.age,
    //     instagram_handle: req.body.instagram_handle,
    //     blog: req.body.blog,
    //     height_ft: req.body.height_ft,
    //     height_in: req.body.height_in,
    //     weight: req.body.weight,
    //     bust_cup: req.body.bust_cup,
    //     bust_band: req.body.bust_band,
    //     waist: req.body.waist,
    //     hips: req.body.hips,
    //     jean_size: req.body.jean_size,
    //     shirt_size: req.body.shirt_size,
    //     leg_length: req.body.leg_length
    // };
    // const profile = new Profile(data);
    
    // profile.save(function(err, result) {
    //     if (err) next(err);
    //     else {
    //         res.json({ message: 'Profile created', profile: result });
    //     }
    // });
    var json = signup_controller.push(req.body, (profile) => {
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