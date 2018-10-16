var express = require('express');
var router = express.Router();

var signup_controller = require('../controllers/signup-controller');

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
        res.json(result); // route to profile page (render)
    } else {
        res.render('pages/influencers/signup', { title: 'Sign Up', errors: errors});
    }
});

router.post('/login', async(req, res, next) => {
    
});


router.get('/manual', (req, res, next) => {
    res.render('pages/influencers/manual', {title: "Help"});
})

router.get('/home', (req, res, next) => {
    res.render('views/pages/influencers/home');
});

module.exports = router;