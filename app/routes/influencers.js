var express = require('express');
var moment = require('moment');
var router = express.Router();
var util = require('../util/util');
var passport = require('passport');

var signup_controller = require('../controllers/signup-controller');
var post_controller = require('../controllers/post-controller');

var VALIDATION_ERRORS = util.VALIDATION_ERRORS;

/**
 * Loads the login page once the user selects "influencer" on landing page.
 */

router.get('/', (req, res, next) => {
    if (req.user) {
        res.redirect('/influencers/home');
    }
    res.render('pages/influencers/login', { title: 'Login', errors: '', fields: ''});
});

/**
 * Route the user to the login page
 */
router.get('/login', (req, res, next) => {
    if (req.user) {
        res.redirect('/influencers/home');
    }
    res.render('pages/influencers/login', { title: 'Login', errors: '', fields: ''});
});

/**
 * This checks that the given credentials for login page were correct/found in the DB. If so, it will redirect user to 
 * home page, else, appear the login form populated with error messages (e.g. email not found in DB)
 */
router.post('/login', async (req, res, next) => {
    if (req.body.remember_me) {
        req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
    }
    passport.authenticate('local', (err, user, info) => {
        if (user) {
            req.logIn(user, (err) => {
                return res.redirect('/influencers/home');
            })
        } else {
            return res.render('pages/influencers/login', { title: 'Login', errors: {'email': VALIDATION_ERRORS['CREDENTIALS_INVALID']}, fields: ''})
        }
    })(req, res, next);
});

/**
 * Loads signup form when user uses the signup link in the footer, or by typing it manually
 */
router.get('/signup', (req, res, next) => {
    res.render('pages/influencers/signup', { title: 'Sign Up', errors: '', fields: ''});
});

/**
 * Once a user clicks the 'sign up' button on the form, it will validate inputs and redirect user to home page if all 
 * goes well. If not, errors will be posted on the form itself.
 */

router.post('/signup', async (req, res, next) => {
    var errors = await signup_controller.validate(req.body);

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        await signup_controller.signup(req.body);
        passport.authenticate('local', (err, user, info) => {
            if (user) {
                req.logIn(user, (err) => {
                    return res.redirect('/influencers/home');
                })
            } else {
                return res.render('pages/influencers/login', { title: 'Login', errors: {'email': VALIDATION_ERRORS['CREDENTIALS_INVALID']}, fields: ''})
            }
        })(req, res, next);
    } else {
        res.render('pages/influencers/signup', { title: 'Sign Up', errors: errors, fields: req.body});
    }
});

/**
 * Route the user to the influencer home page after authentication passes 
 */
router.get('/home', async (req, res, next) => {
    if (req.user) {
        var posts = await post_controller.findAll(req.user.email);
        res.render('pages/influencers/home', { title: 'Home', posts: posts, moment: moment });
    } else {
        res.redirect('/influencers/login');
    }
});

/**
 * If the user clicks the 'need help' button on the signup form, it will redirect to the manual for fashionxproject
 */
router.get('/manual', (req, res, next) => {
    res.render('pages/influencers/manual', {title: "Help"});
});

module.exports = router;