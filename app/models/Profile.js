/** Profile - Handles influencer account creation and contains all collected body information */
var mongoose = require('mongoose');
var util = require('../util/util');

util.connect();

// schema 
var profileSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: [18, "You must be at least 18 years old to sign up."]
    },
    instagram_handle: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: false
    },
    height_ft: {
        type: Number,
        required: true,
        min: [0, 'Height cannot be negative.']
    },
    height_in: {
        type: Number,
        required: true,
        min: [0, 'Height cannot be negative.'],
        max: [11, 'Height inches cannot exceed 11 inches.']
    },
    weight: {
        type: Number,
        required: true,
        min: [0, 'Weight cannot be negative.']
    },
    bust_cup: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    },
    bust_band: {
        type: String,
        required: true,
        enum: ['Band A', 'Band B', 'Band C']
    },
    waist: {
        type: Number,
        required: true,
        min: [0, 'Waist cannot be negative']
    },
    hips: {
        type: Number,
        required: true,
        min: [0, 'Hips cannot be negative.']
    },
    jean_size: {
        type: String,
        required: true,
        enum: [
            'Extra Small (XS)',
            'Small (S)',
            'Medium (M)',
            'Large (L)',
            'Extra Large (XL)'
        ]
    },
    shirt_size: {
        type: String,
        required: true,
        enum: [
            'Extra Small (XS)',
            'Small (S)',
            'Medium (M)',
            'Large (L)',
            'Extra Large (XL)'
        ]
    },
    leg_length: {
        type: Number,
        required: true,
        min: [0, 'Leg length cannot be negative.']
    },
    torso_length: {
        type: String,
        required: true,
        enum: [
            'Short',
            'Average',
            'Long',
        ]
    },
});

// instance methods 

// static methods 
/**
Create new profile based off of passed in data
*/
profileSchema.statics.push = async (
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
    leg_length,
    torso_length
) => {
    var profile = new Profile({
        first_name: first_name,
        email: email,
        age: age,
        instagram_handle: instagram_handle,
        blog: blog,
        height_ft: height_ft,
        height_in: height_in,
        weight: weight,
        bust_cup: bust_cup,
        bust_band: bust_band,
        waist: waist,
        hips: hips,
        jean_size: jean_size,
        shirt_size: shirt_size,
        leg_length: leg_length,
        torso_length: torso_length
    });
    await profile.save();
    return profile;
};

/**
Find profile
@param {integer} id - Profile id.
*/
profileSchema.statics.find = async (id) => {
    var profile = await Profile.findById(id);
    return profile;
};

profileSchema.statics.findProfile = async (email) => {
    var profile = await Profile.findOne({email: email});
    return profile;
};

/**
Delete profile
@param {integer} id - Profile id.
*/
profileSchema.statics.remove = async (id) => {
    var profile = await Profile.findByIdAndRemove(id);
    return profile;
};

/**
Update profile with passed in data
@param {integer} id - Profile id.
*/
profileSchema.statics.update = async (
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
    leg_length,
    torso_length
) => {
    var profile = await Profile.findByIdAndUpdate(id, {
        first_name: first_name,
        email: email,
        age: age,
        instagram_handle: instagram_handle,
        blog: blog,
        height_ft: height_ft,
        height_in: height_in,
        weight: weight,
        bust_cup: bust_cup,
        bust_band: bust_band,
        waist: waist,
        hips: hips,
        jean_size: jean_size,
        shirt_size: shirt_size,
        leg_length: leg_length,
        torso_length: torso_length
    });
    return profile;
};

profileSchema.statics.updateProfile = async (
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
    leg_length,
    torso_length
) => {
    var profile = await Profile.findOneAndUpdate({email: email}, {
        first_name: first_name,
        email: email,
        age: age,
        instagram_handle: instagram_handle,
        blog: blog,
        height_ft: height_ft,
        height_in: height_in,
        weight: weight,
        bust_cup: bust_cup,
        bust_band: bust_band,
        waist: waist,
        hips: hips,
        jean_size: jean_size,
        shirt_size: shirt_size,
        leg_length: leg_length,
        torso_length: torso_length
    });
    return profile;
};

// model
var Profile = mongoose.model('Profile', profileSchema, 'profile');

module.exports = Profile;
