var express = require('express');
var passport = require('passport');
var util = require('../util/util');

var router = express.Router();

var administrator_controller = require('../controllers/administrator-controller');
var profile_controller = require('../controllers/profile-controller');
var rights_controller = require('../controllers/rights-controller');

var VALIDATION_ERRORS = util.VALIDATION_ERRORS;

isAdministratorAuthenticated = async  (req, res, next) => {
    var result = await administrator_controller.authenticate({email: req.body.email, password: req.body.password});
    return (result !== false) ? true : false;
};

router.get('/', async (req, res, next) => {
    res.redirect('administrators/login');
});

router.get('/login', async (req, res, next) => {
    return res.render('pages/administrators/login', { title: 'Login', errors: '', fields: '', user: ''});
});
router.get('/admin-manual', async (req, res, next) => {
    return res.render('pages/administrators/admin-manual', { title: 'Admin Manual', errors: '', fields: '', user: ''});
});

router.get('/panel', async (req, res, next) => {
    if (req.cookies.isAuthenticated != 'true') {
        return res.redirect('login');
    }
    res.render('pages/administrators/panel', {title: 'Panel', errors: '', fields: '', user: ''});
});

router.get('/profiles', async (req, res, next) => {
    if (req.cookies.isAuthenticated != 'true') {
        return res.redirect('login');
    }
    var profiles = await profile_controller.findAllProfiles();
    res.json(profiles);
});

router.get('/rights', async (req, res, next) => {
    if (req.cookies.isAuthenticated != 'true') {
        return res.redirect('login');
    }
    var rights = await rights_controller.findAllRights();
    res.json(rights);
});

router.get('/signout', async (req, res, next) => {
    res.cookie('isAuthenticated', false);
    return res.redirect('/administrators/login');
});

router.post('/login', async (req, res, next) => {
    var emailExists = await administrator_controller.findAdministrator(req.body.email);
    emailExists = (emailExists !== null) ? true : false;
    var isAuthenticated = await administrator_controller.authenticate({email: req.body.email, password: req.body.password});

    if (emailExists === false) {
        return res.render('pages/administrators/login', {
            title: 'Login',
            errors: {
                'email': VALIDATION_ERRORS['EMAIL_DOES_NOT_EXIST']
            },
            fields: '',
            user: ''
        })
    }

    if (isAuthenticated) {
        res.cookie('isAuthenticated', true);
        return res.redirect('/administrators/panel');
    } else {
        return res.render('pages/administrators/login', { 
            title: 'Login', 
            errors: {
                'email': VALIDATION_ERRORS['CREDENTIALS_INVALID']
            },
            fields: '',
            user: ''
        });
    }
});

module.exports = router;