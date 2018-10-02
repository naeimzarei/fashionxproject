var Profile = require('../models/Profile');

module.exports = {
    validate: function(data) {
        var profile = new Profile({
            first_name: data.first_name,
            email: data.email,
            password: data.password,
            age: data.age,
            instagram_handle: data.instagram_handle,
            blog: data.blog,
            height_ft: data.height_ft,
            height_in: data.height_in,
            weight: data.weight,
            bust_cup: data.bust_cup,
            bust_band: data.bust_band,
            waist: data.waist,
            hips: data.hips,
            jean_size: data.jean_size,
            shirt_size: data.shirt_size,
            leg_length: data.leg_length
        });

        module.exports.push(profile);
    },
    push: function(profile) {
        profile.save(function(err) {
            if (err) throw err;
        });
    }
};