/** Profile - Handles influencer account creation and contains all collected body information and routes to models/Profile.js */
var Profile = require('../models/Profile');
var util = require('../util/util');

var profile_controller = {};

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
