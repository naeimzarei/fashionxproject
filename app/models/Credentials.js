/** Credentials - Handles creating login information for each account - Currently a duplicate of model and controller */
var mongoose = require('mongoose');
let bcrypt = require('bcrypt');
var config = require('../config/config');

mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });

// schema 
var credentialsSchema = new mongoose.Schema({
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
credentialsSchema.statics.push = async (email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var credentials = new Credentials({
        email: email,
        password: hash
    });
    await credentials.save();
    return credentials;
};

/**
Find authentication credentials
@param {integer} id - Authentication id
*/
credentialsSchema.statics.find = async (id) => {
    var credentials = await Credentials.findById(id);
    return credentials;
};

/**
 * Check authenticate credentials 
 * @param {string} email the email 
 */
credentialsSchema.statics.findCredentials = async (email) => {
    var credentials = await Credentials.findOne({email: email});
    return credentials;
};

/**
Delete authentication credentials
@param {integer} id - Authentication id
*/
credentialsSchema.statics.remove = async (id) => {
    var credentials = await Credentials.findByIdAndRemove(id);
    return credentials;
};

/**
 * Delete authentication credentials
 * @param {string} email - email address 
 */
credentialsSchema.statics.removeCredentials = async (email) => {
    var credentials = await Credentials.findOneAndRemove({email: email});
};

/**
Update authentication credentials
@param {integer} id - Authentication id
@param {string} email - Account email
@param {string} password - New desired password
*/
credentialsSchema.statics.update = async (id, email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var credentials = await Credentials.findByIdAndUpdate(id, {
        email: email,
        password: hash
    });
    return credentials;
};

/**
 * Update authentication credentails
 * @param {string} email 
 * @param {string} password 
 */
credentialsSchema.statics.updateCredentials = async (previous_email, email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var credentials = await Credentials.findOneAndUpdate({email: previous_email}, {
        email: email,
        password: hash
    });
    return credentials;
};

/**
 * Check that the user is authenticated
 * @param {{}} profile the profile object 
 */
credentialsSchema.statics.authenticate = async(profile) => {
    var auth = await Credentials.findCredentials(profile.email);
    if (auth) {
        var result = await bcrypt.compare(profile.password, auth.password);
        return result;
    }
    return false;
};

// instance methods 

// model
var Credentials = mongoose.model('Credentials', credentialsSchema, 'credentials');

module.exports = Credentials;
