/** Administrator - Handles creating login information for each admin account  */
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var util = require('../util/util');

util.connect();

// schema
var administratorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static methods 
/**
Create authentication credentials
@param {string} email - User email address on account
@param {string} password - Desired password that gets hashed
*/
administratorSchema.statics.push = async (email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var administrator = new Administrator({
        email: email,
        password: hash
    });
    await administrator.save();
    return administrator;
};

/**
 * Check authenticate credentials 
 * @param {string} email the email 
 */
administratorSchema.statics.findAdministrator = async (email) => {
    var administrator = await Administrator.findOne({email: email});
    return administrator;
};

/**
 * Find all credentials of administrators 
 */
administratorSchema.statics.findAllAdministrators = async () => {
    var administrators = await Administrator.find({});
    return administrators;
};

/**
 * Delete authentication credentials
 * @param {string} email - email address 
 */
administratorSchema.statics.removeAdministrator = async (email) => {
    var administrator = await Administrator.findOneAndRemove({email: email});
    return administrator;
};

/**
 * Update authentication credentials
 * @param {string} previous_email 
 * @param {string} email 
 * @param {string} password 
 */
administratorSchema.statics.updateCredentials = async (previous_email, email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var administrator = await Administrator.findOneAndUpdate({email: previous_email}, {
        email: email,
        password: hash
    });
    return administrator;
};

/**
 * Check that the user is authenticated
 * @param {{}} profile the profile object 
 */
administratorSchema.statics.authenticate = async(profile) => {
    var auth = await Administrator.findAdministrator(profile.email);
    if (auth) {
        var result = await bcrypt.compare(profile.password, auth.password);
        return result;
    }
    return false;
};

// instance methods 

// model
var Administrator = mongoose.model('Administrator', administratorSchema, 'administrator');

module.exports = Administrator;