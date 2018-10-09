var mongoose = require('mongoose');

// schema 
var profileSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    password: {
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

// static methods 
profileSchema.statics.push = async (
    first_name,
    password,
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
    var profile = new Profile({
        'first_name': first_name,
        'password': password,
        'email': email,
        'age': age,
        'instagram_handle': instagram_handle,
        'blog': (blog !== undefined) ? blog : '',
        'height_ft': height_ft,
        'height_in': height_in,
        'weight': weight,
        'bust_cup': bust_cup,
        'bust_band': bust_band,
        'waist': waist,
        'hips': hips,
        'jean_size': jean_size,
        'shirt_size': shirt_size,
        'leg_length': leg_length
    });
    await profile.save();
    return profile;
};

profileSchema.statics.find = async (id) => {
    var profile = await Profile.findById(id);
    return profile;
};

profileSchema.statics.remove = async (id) => {
    var profile = await Profile.findByIdAndRemove(id);
    return profile;
};

profileSchema.statics.update = async (
    id,
    first_name,
    password,
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
    var profile = await Profile.findByIdAndUpdate(id, {
        'first_name': first_name,
        'password': password,
        'email': email,
        'age': age,
        'instagram_handle': instagram_handle,
        'blog': (blog !== undefined) ? blog : '',
        'height_ft': height_ft,
        'height_in': height_in,
        'weight': weight,
        'bust_cup': bust_cup,
        'bust_band': bust_band,
        'waist': waist,
        'hips': hips,
        'jean_size': jean_size,
        'shirt_size': shirt_size,
        'leg_length': leg_length
    });
    return profile;
};

// model
var Profile = mongoose.model('Profile', profileSchema, 'profile');

module.exports = Profile;