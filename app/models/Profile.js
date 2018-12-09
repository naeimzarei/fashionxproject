/** Profile - Handles influencer account creation and contains all collected body information */
var mongoose = require('mongoose');
var util = require('../util/util');

util.connect();

// schema 
var profileSchema = mongoose.Schema({
    /* personal/payment info */
    first_name: {
        type: String,
        required: true
    },
    last_name: {
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
    paypal: {
        type: String,
        required: true
    },

    /* shipping info */
    address1: {
        type: String,
        required: true
    },

    address2: {
        type: String,
        required: false
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true,
        enum: ['AK' , 'AL' , 'AR' , 'AZ' , 'CA' , 'CO' , 'CT' , 'DC' , 'DE' , 'FL' , 'GA' , 'HI' , 'IA' , 'ID' , 'IL' , 'IN' , 'KS' , 'KY' , 'LA' , 'MA' , 'MD' , 'ME' , 'MI' , 'MN' , 'MO' , 'MS' , 'MT' , 'NC' , 'ND' , 'NE' , 'NH' , 'NJ' , 'NM' , 'NV' , 'NY' , 'OH' , 'OK' , 'OR' , 'PA' , 'PR' , 'RI' , 'SC' , 'SD' , 'TN' , 'TX' , 'UT' , 'VA' , 'VT' , 'WA' , 'WI' , 'WV' , 'WY']
    },

    zip: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    phone_number: {
        type: String,
        required: true
    },

    /* fit info */
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
    last_name,
    email,
    dob,
    instagram_handle,
    likeToKnowIt,
    blog,
    paypal,

    address1,
    address2,
    city,
    state,
    zip,
    country,
    phone_number,

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
        last_name: last_name,
        email: email,
        dob: dob,
        instagram_handle: instagram_handle,
        likeToKnowIt: likeToKnowIt,
        blog: blog,
        paypal: paypal,

        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        country: country,
        phone_number: phone_number,

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
profileSchema.statics.findByIds = async (id) => {
    var profile = await Profile.findById(id);
    return profile;
};

profileSchema.statics.findProfile = async (email) => {
    var profile = await Profile.findOne({email: email});
    return profile;
};

profileSchema.statics.findAllProfiles = async () => {
    var profiles = await Profile.find({});
    return profiles;
}

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
    last_name,
    email,
    dob,
    instagram_handle,
    likeToKnowIt,
    blog,
    paypal,

    address1,
    address2,
    city,
    state,
    zip,
    country,
    phone_number,

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
        last_name: last_name,
        email: email,
        dob: dob,
        instagram_handle: instagram_handle,
        likeToKnowIt: likeToKnowIt,
        blog: blog,
        paypal: paypal,

        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        country: country,
        phone_number: phone_number,

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
    last_name,
    email,
    dob,
    instagram_handle,
    likeToKnowIt,
    blog,
    paypal,

    address1,
    address2,
    city,
    state,
    zip,
    country,
    phone_number,

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
        last_name: last_name,
        email: email,
        dob: dob,
        instagram_handle: instagram_handle,
        likeToKnowIt: likeToKnowIt,
        blog: blog,
        paypal: paypal,

        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        country: country,
        phone_number: phone_number,

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
