/** Signup - Validates profile information on influencer sign-up to ensure the data sent meets requirements */
var util = require('../util/util');
var Profile = require('../models/Profile');
var emailExistence = require('email-existence');

var profile_controller = require('./profile-controller');
var credentials_controller = require('./credentials-controller');

var signup_controller = {};
/**
Validates profile account creation input
@param {object} profile - Profile data
*/
signup_controller.validate = async (profile) => {
    
    var profile_info = {
        first_name: profile.first_name,
        email: profile.email,
        age: profile.age,
        instagram_handle: profile.instagram_handle,
        blog: profile.blog,
        height_ft: profile.height_ft,
        height_in: profile.height_in,
        weight: profile.weight,
        bust_cup: profile.bust_cup,
        bust_band: profile.bust_band,
        waist: profile.waist,
        hips: profile.hips,
        jean_size: profile.jean_size,
        shirt_size: profile.shirt_size,
        leg_length: profile.leg_length
    };
    var profiles = new Profile(profile_info);

    var error_object = util.format_errors_object(profile_info, profiles);
    
    if(/(?=.*\d)(?=.*[A-Z]){6,12}/.test(profile.password)){
        console.log('good pass');
    }else{
        error_object['password'] = 'Must have a length of 6 with 1 number and 1 capital letter.';
    }

    var result = await new Promise((resolve, reject) => {
        emailExistence.check(profile.email, (err, response) => {
            result = response;
            resolve(response);
        });
    });

    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(profile.email)){
        if (result === false) {
            error_object['email'] = 'Email does not exist. Please provide a valid email address.';
        } 
    }else{
        error_object['email'] = "Please provide a valid email address.";
    }

    return error_object;
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
