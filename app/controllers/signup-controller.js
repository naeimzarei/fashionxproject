var Profile = require('../models/Profile');

var signup_controller = {};

signup_controller.validate = (profile) => {
    console.log('profile', profile);
};

signup_controller.push = async (profile) => {
    var profile = new Profile(profile);
    return await profile.push(profile);
}

module.exports = signup_controller;