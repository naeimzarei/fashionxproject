var express = require('express');
var moment = require('moment');
var router = express.Router();
var util = require('../util/util');

var signup_controller = require('../controllers/signup-controller');
var credentials_controller = require('../controllers/credentials-controller');
var post_controller = require('../controllers/post-controller');

var VALIDATION_ERRORS = util.VALIDATION_ERRORS;

/**
 * Loads the login page once the user selects "influencer" on landing page.
 */

router.get('/', (req, res, next) => {
    res.render('pages/influencers/login', { title: 'Login', errors: '', fields: ''});
});

router.get('/login', (req, res, next) => {
    res.render('pages/influencers/login', { title: 'Login', errors: '', fields: ''});
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
        var posts = await post_controller.findAll(req.body.email);
        res.render('pages/influencers/home', { title: "Home", posts: posts, moment: moment });
    } else {
        res.render('pages/influencers/signup', { title: 'Sign Up', errors: errors, fields: req.body});
    }
});

/**
 * This checks that the given credentials for login page were correct/found in the DB. If so, it will redirect user to 
 * home page, else, appear the login form populated with error messages (e.g. email not found in DB)
 */

router.post('/login', async(req, res, next) => {
    var result = await credentials_controller.authenticate(req.body);
    if(result){
        var posts = await post_controller.findAll(req.body.email);
        res.render('pages/influencers/home', { title: "Home", posts: posts, moment: moment });
    }else{
        res.render('pages/influencers/login', {title: "Login", errors: {'email': VALIDATION_ERRORS['EMAIL_DOES_NOT_EXIST']}, fields: ''})
    }
});

/**
 * If the user clicks the 'need help' button on the signup form, it will redirect to the manual for fashionxproject
 */
router.get('/manual', (req, res, next) => {
    res.render('pages/influencers/manual', {title: "Help"});
})

// router.get('/home', async(req, res, next) => {
//     var posts = await post_controller.findAll();
//     res.render('pages/influencers/home', { title: "Home", posts: posts, moment: moment });
// });

module.exports = router;