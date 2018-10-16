/** Signup - Validates profile information on influencer sign-up to ensure the data sent meets requirements */
var util = require('../util/util');
var Profile = require('../models/Profile');

var profile_controller = require('./profile-controller');
var credentials_controller = require('./credentials-controller');

var signup_controller = {};
/**
Validates profile account creation input
@param {object} profile - Profile data
*/
signup_controller.validate = (profile) => {
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
    var profile = new Profile(profile_info);

    return util.format_errors_object(profile_info, profile);
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
