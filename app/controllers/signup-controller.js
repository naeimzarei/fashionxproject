/** Signup - Validates profile information on influencer sign-up to ensure the data sent meets requirements */
//var emailExistence = require('email-existence');
var util = require('../util/util');

var profile_controller = require('./profile-controller');
var credentials_controller = require('./credentials-controller');
var signup_controller = {};

const VALIDATION_ERRORS = util.VALIDATION_ERRORS;

/**
Validates profile account creation input
@param {object} profile - Profile data
*/
signup_controller.validate = async (profile) => {    
    var error_object = {};

    // check if email already exists
    var email_exists = (await profile_controller.findProfile(profile.email)) ? true : false;
    if (email_exists) {
        error_object['email'] = VALIDATION_ERRORS['EMAIL_DUPLICATE'];
        // return error_object;
    }

    // check if email address exists 
    // var email_promise = new Promise((resolve, reject) => {
    //     emailExistence.check(profile.email, (err, response) => {
    //         resolve(response);
    //     });
    // });

    var validation_promise = new Promise((resolve, reject) => {
         
            // check if password is valid 
            if(/(?=.*\d)(?=.*[A-Z]){6,12}/.test(profile.password) === false){
                error_object['password'] = VALIDATION_ERRORS['PASSWORD_INVALID'];
            }

            // check if email has valid syntax 
            if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(profile.email) === false){
                error_object['email'] = VALIDATION_ERRORS['EMAIL_INVALID_SYNTAX'];
                
            }

            // check if age is valid
            if (isNaN(parseInt(profile.age)) === false) {
                if (parseInt(profile.age) < 18) {
                    error_object['age'] = VALIDATION_ERRORS['AGE_INVALID'];
                }
            } else {
                error_object['age'] = VALIDATION_ERRORS['HEIGHT_FT_INVALID'];
            }

            // check if blog URL is valid, if it exists 
            if (profile.blog) {
                if (/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(profile.blog) === false) {
                    error_object['blog'] = VALIDATION_ERRORS['BLOG_INVALID'];
                }
            }

            // check if height_in is valid 
            if (isNaN(parseInt(profile.height_ft)) === false) {
                if (parseInt(profile.height_ft) < 0) {
                    error_object['height_ft'] = VALIDATION_ERRORS['HEIGHT_FT_INVALID'];
                }
            } else {
                error_object['height_ft'] = VALIDATION_ERRORS['HEIGHT_FT_INVALID'];
            }

            // check if height_in is valid 
            if (isNaN(parseInt(profile.height_in)) === false) {
                if (parseInt(profile.heihgt_in) < 0) {
                    error_object['height_in'] = VALIDATION_ERRORS['HEIGHT_IN_INVALID'];
                }
            } else {
                error_object['height_in'] = VALIDATION_ERRORS['HEIGHT_IN_INVALID'];
            }

            // check if weight is valid 
            if (isNaN(parseInt(profile.weight)) === false) {
                if (parseInt(profile.weight) < 0) {
                    error_object['weight'] = VALIDATION_ERRORS['WEIGHT_INVALID'];
                }
            } else {
                error_object['weight'] = VALIDATION_ERRORS['WEIGHT_INVALID'];
            }

            // check if bust (cup) is valid 
            const valid_bust_cup = ['A', 'B', 'C']
            if (valid_bust_cup.includes(profile.bust_cup) === false || profile.bust_cup === 'Bust (cup) *') {
                error_object['bust_cup'] = VALIDATION_ERRORS['BUST_CUP_INVALID'];
            }

            // check if bust (band) is valid 
            const valid_bust_band = ['Band A', 'Band B', 'Band C'];
            if (valid_bust_band.includes(profile.bust_band) === false || profile.bust_band === '(band) *') {
                error_object['bust_band'] = VALIDATION_ERRORS['BUST_BAND_INVALID'];
            }

            // check if waist is valid 
            if (isNaN(parseInt(profile.waist)) === false) {
                if (parseInt(profile.waist) < 0) {
                    error_object['waist'] = VALIDATION_ERRORS['WAIST_INVALID'];
                }
            } else {
                error_object['waist'] = VALIDATION_ERRORS['WAIST_INVALID'];
            }

            // check if hips is valid 
            if (isNaN(parseInt(profile.hips)) === false) {
                if (parseInt(profile.hips) < 0) {
                    error_object['hips'] = VALIDATION_ERRORS['HIPS_INVALID'];
                }
            } else {
                error_object['hips'] = VALIDATION_ERRORS['HIPS_INVALID'];
            }

            // check if jean size is valid 
            const valid_jean_size = ['Extra Small', 'Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)']
            if (valid_jean_size.includes(profile.jean_size) === false || profile.jean_size === 'Usual Jean Size *') {
                error_object['jean_size'] = VALIDATION_ERRORS['JEAN_SIZE_INVALID'];
            }

            // check if shirt size is valid 
            const valid_shirt_size = ['Extra Small', 'Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)']
            if (valid_shirt_size.includes(profile.shirt_size) === false || profile.shirt_size === 'Usual Shirt Size *') {
                error_object['shirt_size'] = VALIDATION_ERRORS['SHIRT_SIZE_INVALID'];
            }

            // check if leg length is valid
            if (isNaN(parseInt(profile.leg_length)) === false) {
                if (parseInt(profile.leg_length) < 0) {
                    error_object['leg_length'] = VALIDATION_ERRORS['LEG_LENGTH_INVALID'];
                }
            } else {
                error_object['leg_length'] = VALIDATION_ERRORS['LEG_LENGTH_INVALID'];
            }
            resolve(error_object);
        
    });

    return await validation_promise;
};

/**
Executes profile account creation
@param {object} profile - Profile data
*/
signup_controller.signup = async (profile) => {
    var profiles = await profile_controller.push(
        profile.first_name,
        profile.email,
        profile.age,
        profile.instagram_handle,
        profile.blog,
        profile.height_ft,
        profile.height_in,
        profile.weight,
        profile.bust_cup,
        profile.bust_band,
        profile.waist,
        profile.hips,
        profile.jean_size,
        profile.shirt_size,
        profile.leg_length
    );

    await credentials_controller.push(profile.email, profile.password);
    return profiles;
};

module.exports = signup_controller;
