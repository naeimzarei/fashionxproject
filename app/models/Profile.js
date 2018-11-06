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
    dob: {
        type: String,
        required: true
    },
    instagram_handle: {
        type: String,
        required: true
    },
    likeToKnowIt: {
        type: String,
        required: false
    },
    blog: {
        type: String,
        required: false
    },
    zip: {
        type: Number,
        required: true
    },
    paypal: {
        type: String,
        required: true
    },
    height_ft: {
        type: Number,
        required: true,
        min: [0, 'Height cannot be negative.'],
        max: [9, 'Height cannot be above 9 feet']
    },
    height_in: {
        type: Number,
        required: true,
        min: [0, 'Height cannot be negative.'],
        max: [11, 'Height inches cannot exceed 11 inches.']
    },
    bust_band: {
        type: String,
        required: true,
        enum: ['28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', '60']
    },
    bust_cup: {
        type: String,
        required: true,
        enum: ['AA', 'A', 'B', 'C', 'D', 'E (DD)', 'F (DDD)', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
    },
    waist: {
        type: Number,
        required: true,
        min: [0, 'Natural Waist cannot be negative']
    },
    shirt_size: {
        type: String,
        required: true,
        enum: [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            'XXL',
            'XXXL'
        ]
    },
    jean_size: {
        type: String,
        required: true,
        enum: ['24', '25', '26', '27', '27', '28', '29', '30', '31', '32', '33', '34', '14 (Plus)', '16 (Plus)', '18 (Plus)',
                '20 (Plus)', '22 (Plus)', '24 (Plus)', '26 (Plus)']
    },
    torso_length: {
        type: String,
        required: true,
        enum: [
            'Short',
            'Regular',
            'Long',
        ]
    },
    leg_length: {
        type: String,
        required: true,
        enum:['Petite', 'Regular', 'Long']
    }
});

// instance methods 

// static methods 
/**
Create new profile based off of passed in data
*/
profileSchema.statics.push = async (
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
    var profile = new Profile({
        first_name: first_name,
        email: email,
        dob: dob,
        instagram_handle: instagram_handle,
        likeToKnowIt: likeToKnowIt,
        blog: blog,
        zip: zip,
        paypal: paypal,
        height_ft: height_ft,
        height_in: height_in,
        bust_band: bust_band,
        bust_cup: bust_cup,
        waist: waist,
        shirt_size: shirt_size,
        jean_size: jean_size,
        torso_length: torso_length,
        leg_length: leg_length
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
    var profile = await Profile.findByIdAndUpdate(id, {
        first_name: first_name,
        email: email,
        dob: dob,
        instagram_handle: instagram_handle,
        likeToKnowIt: likeToKnowIt,
        blog: blog,
        zip: zip,
        paypal: paypal,
        height_ft: height_ft,
        height_in: height_in,
        bust_band: bust_band,
        bust_cup: bust_cup,
        waist: waist,
        shirt_size: shirt_size,
        jean_size: jean_size,
        torso_length: torso_length,
        leg_length: leg_length
    });
    return profile;
};

profileSchema.statics.updateProfile = async (
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
    var profile = await Profile.findOneAndUpdate({email: email}, {
        first_name: first_name,
        email: email,
        dob: dob,
        instagram_handle: instagram_handle,
        likeToKnowIt: likeToKnowIt,
        blog: blog,
        zip: zip,
        paypal: paypal,
        height_ft: height_ft,
        height_in: height_in,
        bust_band: bust_band,
        bust_cup: bust_cup,
        waist: waist,
        shirt_size: shirt_size,
        jean_size: jean_size,
        torso_length: torso_length,
        leg_length: leg_length
    });
    return profile;
};

// model
var Profile = mongoose.model('Profile', profileSchema, 'profile');

module.exports = Profile;
