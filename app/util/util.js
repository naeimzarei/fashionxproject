var util = {};
var config = require('../config/config');
var mongoose = require('mongoose');

util.format_errors_object = (object_info, object) => {
    if (object.validateSync() === undefined) {
        return {};
    }
    var err = object.validateSync().errors;
    var errors = {};
    for (field in object_info) {
        if (err[field]) {
            errors[field] = err[field].message;
        }
    }
    return errors;
};

util.connect = async () => {
    await mongoose.set('useFindAndModify', false);
    return await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true, useCreateIndex: true});
};

util.VALIDATION_ERRORS = {
    FIRST_NAME_INVALID: 'Please provide a valid first name.',
    EMAIL_INVALID_SYNTAX: 'Please provide a valid email address.',
    EMAIL_DOES_NOT_EXIST: 'Email does not exist. Please provide a valid email address.',
    EMAIL_DUPLICATE: 'Email already exists.',
    PASSWORD_INVALID: 'Password must be 6-12 characters long and must contain at least one number and capital letter.',
    CREDENTIALS_INVALID: 'The email and or password combination is incorrect.',
    AGE_INVALID: 'You must be at least 18 years or older to register.',
    INSTAGRAM_HANDLE_INVALID: "Please be sure to include '@'",
    BLOG_INVALID: 'Please provide a valid blog URL.',
    ZIP_INVALID: 'Please provide a valid zip code',
    PAYPAL_INVALID: "Please include '@'",
    HEIGHT_FT_INVALID: 'Please provide a valid height (ft).',
    HEIGHT_IN_INVALID: 'Please provide a valid height (in).',
    BUST_CUP_INVALID: 'Please select a valid bust (cup).',
    BUST_BAND_INVALID: 'Please select a valid bust (band).',
    WAIST_INVALID: 'Please provide a valid waist size (in).',
    JEAN_SIZE_INVALID: 'Please select a valid jean size.',
    SHIRT_SIZE_INVALID: 'Please select a valid shirt size.',
    LEG_LENGTH_INVALID: 'Please provide a valid leg length.',
    TORSO_LENGTH_INVALID: 'Please provide a valid torso length'
};

module.exports = util;