var express = require('express');
var passport = require('passport');
var util = require('../util/util');
const nodemailer = require('nodemailer');

var router = express.Router();

var administrator_controller = require('../controllers/administrator-controller');
var profile_controller = require('../controllers/profile-controller');
var rights_controller = require('../controllers/rights-controller');

var VALIDATION_ERRORS = util.VALIDATION_ERRORS;
// config 
var config = require('../config/config');

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

router.post('/approve', async (req, res, next) => {
    await rights_controller.updateRights(req.body.email, '1');
    res.json({isApproved: true});
    //send decision email to applicant
    const transporter = nodemailer.createTransport({
        
        service: 'Outlook365',
        host: "smtpout.secureserver.net",  
        secureConnection: true,
        port: 465,
        auth: {
        user: config.EMAIL,
        pass: config.PASS
        }
    });
    const mailOptions = {
        from: config.EMAIL,
        to: `${req.body.email}`,
        subject: 'Approved',
        text: "You’ve been approved to sell your pre-owned apparel through SHOPHERLOOK. Go to https://shopherlook.app/sell and start selling your closet! Please review the Terms of service before submitting your items to sell.",
        replyTo: config.EMAIL
    }
    transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
        console.error('there was an error: ', err);
        } else {
        console.log('here is the res: ', res)
        }
    })
});

router.post('/reject', async (req, res, next) => {
    await rights_controller.updateRights(req.body.email, '2');
    res.json({isApproved: false});
    //send decision email to applicant 
    const transporter2 = nodemailer.createTransport({
        service: 'Outlook365',
        host: "imap.secureserver.net",  
        secureConnection: true,
        port: 465,
        auth: {
        user: config.EMAIL,
        pass: config.PASS
        }
    });
    
    const mailOptions2 = {
        from: config.EMAIL, 
        to: `${req.body.email}`,
        subject: 'Denied',
        text: "We appreciate your interest in becoming a seller through SHOPHERLOOK and the time you’ve invested in applying. We ended up deciding not to grant you access to our platform as a seller at this moment, but we’d like to thank you for giving us the opportunity to learn about you. We encourage you to apply again in 3 months or more as there may be new open slots for sellers.",
        replyTo: config.EMAIL
    }
    transporter2.sendMail(mailOptions2, function(err, res) {
        if (err) {
        console.error('there was an error: ', err);
        } else {
        console.log('here is the res: ', res)
        }
    })

});

module.exports = router;