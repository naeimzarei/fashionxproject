var express = require('express');
var passport = require('passport');
var util = require('../util/util');

var router = express.Router();

var administrator_controller = require('../controllers/administrator-controller');

router.get('/', async (req, res, next) => {
    res.redirect('administrators/login');
});

router.get('/login', async (req, res, next) => {
    res.render('pages/administrators/login', { title: 'Login', errors: '', fields: '', user: ''});
});

router.post('/login', async (req, res, next) => {
    var isAuthenticated = await administrator_controller.authenticate({email: req.body.email, password: req.body.password});
    console.log('isAuthenticated', isAuthenticated);
});

module.exports = router;