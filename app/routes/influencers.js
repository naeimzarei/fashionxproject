var express = require('express');
var moment = require('moment');
var router = express.Router();
var util = require('../util/util');
var passport = require('passport');
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

var signup_controller = require('../controllers/signup-controller');
var post_controller = require('../controllers/post-controller');
var profile_controller = require('../controllers/profile-controller');

var VALIDATION_ERRORS = util.VALIDATION_ERRORS;

// config 
var config = require('../config/config');

// setup AWS
aws.config.update({
    secretAccessKey: config.SECRET_ACCESS_KEY,
    accessKeyId: config.ACCESS_KEY_ID,
    region: config.REGION
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: config.BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, req.body.product_link));
        },
        key: function (req, file, cb) {
            cb(null, req.user.email + '/' + Date.now() + '-' + file.originalname);
        }
    })
}).array('photo-upload', 10); // 10 species 10 max photos can be uploaded at a time

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
        //req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
        req.session.cookie.maxAge = 21 * 24 * 60 * 60 * 1000;
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

/**
 * Routes user to uplaod page when user clicks on plus square icon in the header.
 */
router.get('/submit', (req, res, next) => {
    res.render('pages/influencers/submit', { title: 'Submit Picture', errors: '', fields: '' });
});

/**
 * Post creation and handlese photo uploads photo to S3
 */
router.post('/submit', (req,res,next) => {
    
    upload(req, res, function (error) {
        if (error) {
            console.log(error);
            res.send('Upload failed!');
        }
        res.send('Uploaded photo(s)!');
        var imgUrls = req.files.map(function(file) {
            return file.location;
        });
    });
});

/**
 * View post
 */
router.get('/posts/:id', async (req, res, next) => {
    var post = await post_controller.find(req.params.id);
    var data;
    if (post.length) {
        data = post[0];
    }

    res.render('pages/influencers/post', { title: data.title, post: data });
});

/**
 * View user profile
 */
router.get('/profile', async (req, res, next) => {
    var profile = await profile_controller.findProfile(req.user.email);
    res.render('pages/influencers/profile', { title: 'My Profile', profile: profile, errors: '', fields: '' });
});

module.exports = router;