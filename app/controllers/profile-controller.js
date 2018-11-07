/** Profile - Handles influencer account creation and contains all collected body information and routes to models/Profile.js */
var Profile = require('../models/Profile');
var util = require('../util/util');

var profile_controller = {};

const VALIDATION_ERRORS = util.VALIDATION_ERRORS;

/**
Validates profile account update input
@param {object} profile - Profile data
*/
profile_controller.validate = async (profile) => {    
    var error_object = {};

    var validation_promise = new Promise((resolve, reject) => {
        // check if first_name is valid 
        profile.first_name = profile.first_name.toString().trim();
        if (/\d/.test(profile.first_name) || profile.first_name === '') {
            error_object['first_name'] = VALIDATION_ERRORS['FIRST_NAME_INVALID'];
        }

        // check if email has valid syntax 
        // if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(profile.email) === false){
        //     error_object['email'] = VALIDATION_ERRORS['EMAIL_INVALID_SYNTAX'];
        // }

        // check if age is valid
        // if (isNaN(parseInt(profile.age)) === false) {
        //     if (parseInt(profile.age) < 18) {
        //         error_object['age'] = VALIDATION_ERRORS['AGE_INVALID'];
        //     }
        // } else {
        //     error_object['age'] = VALIDATION_ERRORS['AGE_INVALID'];
        // }
        var d = new Date();
        var mo = parseInt(d.getMonth());
        var yr = parseInt(d.getFullYear());
        var inputDob = profile.dob.split('-');
        //check if input year subtracted from current year greater than 18
        if(!(yr - parseInt(inputDob[0]) >= 19)){
            //user may have turned 18 this year, check month
            if((yr-parseInt(inputDob[0]) == 18)){
                
                //user is not yet old enough to signup (not yet 18)
                if(parseInt(inputDob[1]) >= mo){
                    error_object['age'] = VALIDATION_ERRORS['AGE_INVALID']
                }

            }
        }

        // check if blog URL is valid, if it exists 
        if (profile.blog) {
            if (/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(profile.blog) === false) {
                error_object['blog'] = VALIDATION_ERRORS['BLOG_INVALID'];
            }
        }
        //check if instagram handle contains '@'
        if(!profile.instagram_handle.includes('@')){
            error_object['instagram_handle'] = VALIDATION_ERRORS['INSTAGRAM_HANDLE_INVALID'];
        }
         //check if zipcode is valid
         var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(profile.zip);
         if(!isValidZip){
             error_object['zip'] = VALIDATION_ERRORS['ZIP_INVALID'];
         }
         //check if paypal account has '@'
        if(!profile.paypal.includes('@')){
            error_object['paypal'] = VALIDATION_ERRORS['PAYPAL_INVALID'];
        }

        // check if height_ift is valid 
        if (isNaN(parseInt(profile.height_ft)) === false) {
            if (parseInt(profile.height_ft) < 0) {
                error_object['height_ft'] = VALIDATION_ERRORS['HEIGHT_FT_INVALID'];
            }
        } else {
            error_object['height_ft'] = VALIDATION_ERRORS['HEIGHT_FT_INVALID'];
        }

        // check if height_in is valid 
        if (isNaN(parseInt(profile.height_in)) === false) {
            if (parseInt(profile.height_in) < 0 || parseInt(profile.height_in) > 11) {
                error_object['height_in'] = VALIDATION_ERRORS['HEIGHT_IN_INVALID'];
            }
        } else {
            error_object['height_in'] = VALIDATION_ERRORS['HEIGHT_IN_INVALID'];
        }

        // check if weight is valid 
        // if (isNaN(parseInt(profile.weight)) === false) {
        //     if (parseInt(profile.weight) < 0) {
        //         error_object['weight'] = VALIDATION_ERRORS['WEIGHT_INVALID'];
        //     }
        // } else {
        //     error_object['weight'] = VALIDATION_ERRORS['WEIGHT_INVALID'];
        // }

        // check if bust (cup) is valid 
     
        const valid_bust_cup = ['AA', 'A', 'B', 'C', 'D', 'E (DD)', 'F (DDD)', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
        if (valid_bust_cup.includes(profile.bust_cup) === false || profile.bust_cup === 'Bust (cup) *') {
            error_object['bust_cup'] = VALIDATION_ERRORS['BUST_CUP_INVALID'];
        }

        // check if bust (band) is valid 
        const valid_bust_band = ['28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', '60'];
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
        // if (isNaN(parseInt(profile.hips)) === false) {
        //     if (parseInt(profile.hips) < 0) {
        //         error_object['hips'] = VALIDATION_ERRORS['HIPS_INVALID'];
        //     }
        // } else {
        //     error_object['hips'] = VALIDATION_ERRORS['HIPS_INVALID'];
        // }

        // check if jean size is valid 
       
        const valid_jean_size = ['24', '25', '26', '27', '27', '28', '29', '30', '31', '32', '33', '34', '14 (Plus)', '16 (Plus)', '18 (Plus)',
        '20 (Plus)', '22 (Plus)', '24 (Plus)', '26 (Plus)']
        if (valid_jean_size.includes(profile.jean_size) === false || profile.jean_size === 'Usual Jean Size *') {
            error_object['jean_size'] = VALIDATION_ERRORS['JEAN_SIZE_INVALID'];
        }
        if (valid_jean_size.includes(profile.jean_size) === false || profile.jean_size === 'Usual Jean Size *') {
            error_object['jean_size'] = VALIDATION_ERRORS['JEAN_SIZE_INVALID'];
        }

        // check if shirt size is valid 
        const valid_shirt_size = [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            'XXL',
            'XXXL'
        ]
        if (valid_shirt_size.includes(profile.shirt_size) === false || profile.shirt_size === 'Usual Shirt Size *') {
            error_object['shirt_size'] = VALIDATION_ERRORS['SHIRT_SIZE_INVALID'];
        }
          // check if torso length is valid 
          const valid_torso_length = ['Short', 'Regular', 'Long']
          if (valid_torso_length.includes(profile.torso_length) === false || profile.torso_length === 'Usual Torso Length *') {
              error_object['torso_length'] = VALIDATION_ERRORS['TORSO_LENGTH_INVALID'];
          }
 
         // check if leg length is valid
         const valid_leg_length = ['Petite', 'Regular', 'Tall']
         if (valid_leg_length.includes(profile.leg_length) === false || profile.leg_length === 'Usual Torso Length *') {
             error_object['leg_length'] = VALIDATION_ERRORS['LEG_LENGTH_INVALID'];
         }
        resolve(error_object); 
    });
    return await validation_promise;
};

/**
Create new profile based off of passed in data
*/
profile_controller.push = async (
    first_name,
    email,
    dob,
    instagram_handle,
    likeToKnowIt,
    blog,
    zip,
    paypal,
    height_ft,
    height_in,
    bust_band,
    bust_cup,
    waist,
    shirt_size,
    jean_size,
    torso_length,
    leg_length
) => {
    return await Profile.push(
        first_name, email, dob,
        instagram_handle, likeToKnowIt, blog, zip, paypal, height_ft,
        height_in, bust_band, bust_cup,
        waist, shirt_size,jean_size, torso_length,
        leg_length
    );
};

/**
Find profile
@param {integer} id - Profile id.
*/
profile_controller.find = async (id) => {
    return await Profile.find(id);
};

/**
 * Find profile
 * @param {string} email
 */
profile_controller.findProfile = async (email) => {
    var profile = await Profile.findOne({email: email});
    return profile;
};

/**
Delete profile
@param {integer} id - Profile id.
*/
profile_controller.remove = async(id) => {
    return await Profile.remove(id);
};

/**
 * Delete profile
 * @param {string} email 
 */
profile_controller.removeProfile = async (email) => {
    return await Profile.findOneAndRemove({email: email});
};

/**
Update profile with passed in data
@param {integer} id - Profile id.
*/
profile_controller.update = async (
    id,
    first_name,
    email,
    dob,
    instagram_handle,
    likeToKnowIt,
    blog,
    zip,
    paypal,
    height_ft,
    height_in,
    bust_band,
    bust_cup,
    waist,
    shirt_size,
    jean_size,
    torso_length,
    leg_length
) => {
    return await Profile.update(
        id,
        first_name,
        email,
        dob,
        instagram_handle,
        likeToKnowIt,
        blog,
        zip,
        paypal,
        height_ft,
        height_in,
        bust_band,
        bust_cup,
        waist,
        shirt_size,
        jean_size,
        torso_length,
        leg_length
    );
}

profile_controller.updateProfile = async(
    first_name,
    email,
    dob,
    instagram_handle,
    blog,
    zip,
    paypal,
    height_ft,
    height_in,
    bust_band,
    bust_cup,
    waist,
    shirt_size,
    jean_size,
    torso_length,
    leg_length
) => {
    return await Profile.updateProfile(
        first_name,
        email,
        dob,
        instagram_handle,
        blog,
        zip,
        paypal,
        height_ft,
        height_in,
        bust_band,
        bust_cup,
        waist,
        shirt_size,
        jean_size,
        torso_length,
        leg_length 
    );
}

module.exports = profile_controller;
