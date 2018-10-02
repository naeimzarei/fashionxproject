var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tester:<password>@cluster0-zz5rm.mongodb.net/users/profile', { useNewUrlParser: true });

// schema 
var profileSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
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
        required: true
    },
    height_in: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bust_cup: {
        type: String,
        required: true
    },
    bust_band: {
        type: Number,
        required: true
    },
    waist: {
        type: Number,
        required: true
    },
    hips: {
        type: Number,
        required: true
    },
    jean_size: {
        type: String,
        required: true
    },
    shirt_size: {
        type: String,
        required: true
    },
    leg_length: {
        type: Number,
        required: true
    }
});

// static methods 

// instance methods 

// model
var Profile = mongoose.model('Profile', profileSchema, 'profile');

module.exports = Profile;