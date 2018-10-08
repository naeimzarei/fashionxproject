var mongoose = require('mongoose');
var config = require('../config/config');

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
        min: [18, "You must be atleast 18 years old to sign up"]
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
        min: [0, 'Height cannot be negative'],
        max: [10, 'Height cannot exceed 10 feet']
    },
    height_in: {
        type: Number,
        required: true,
        min: [0, 'Height cannot be negative'],
        max: [11, 'Height inches cannot exceed 11 inches']
    },
    weight: {
        type: Number,
        required: true,
        min: [1, 'Weight cannot be negative']
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
        min: [1, 'Waist cannot be negative']
    },
    hips: {
        type: Number,
        required: true,
        min: [1, 'Hips cannot be negative']
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
        min: [1, 'Leg length cannot be negative']
    }
});

// instance methods 
profileSchema.methods.push = async (profile) => {
    return await profile.save();
};

// model
var Profile = mongoose.model('Profile', profileSchema, 'profile');

module.exports = Profile;