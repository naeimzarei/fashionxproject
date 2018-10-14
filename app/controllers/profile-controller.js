/** Profile - Handles influencer account creation and contains all collected body information and routes to models/Profile.js */
var Profile = require('../models/Profile');

var profile_controller = {};

/**
Create new profile based off of passed in data
*/
profile_controller.push = async (
    first_name,
    email,
    age,
    instagram_handle,
    blog,
    height_ft,
    height_in,
    weight,
    bust_cup,
    bust_band,
    waist,
    hips,
    jean_size,
    shirt_size,
    leg_length
) => {
    return await Profile.push(
        first_name, email, age,
        instagram_handle, blog, height_ft,
        height_in, weight, bust_cup, bust_band,
        waist, hips, jean_size, shirt_size,
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
Delete profile
@param {integer} id - Profile id.
*/
profile_controller.remove = async(id) => {
    return await Profile.remove(id);
};

/**
Update profile with passed in data
@param {integer} id - Profile id.
*/
profile_controller.update = async (
    id,
    first_name,
    email,
    age,
    instagram_handle,
    blog,
    height_ft,
    height_in,
    weight,
    bust_cup,
    bust_band,
    waist,
    hips,
    jean_size,
    shirt_size,
    leg_length
) => {
    return await Profile.update(
        id,
        first_name,
        email,
        age,
        instagram_handle,
        blog,
        height_ft,
        height_in,
        weight,
        bust_cup,
        bust_band,
        waist,
        hips,
        jean_size,
        shirt_size,
        leg_length 
    );
}

module.exports = profile_controller;
