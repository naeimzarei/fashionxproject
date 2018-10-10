var Profile = require('../models/Profile');

var profile_controller = {};

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

profile_controller.find = async (id) => {
    return await Profile.find(id);
};

profile_controller.remove = async(id) => {
    return await Profile.remove(id);
};

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