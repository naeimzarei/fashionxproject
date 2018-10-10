/** Auth - Handles creating login information for each account */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var config = require('../config/config');

mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });

// schema 
var authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    }
});

/**
Create authentication credentials
@param {string} email - User email address on account
@param {string} password - Desired password that gets hashed
*/
authSchema.statics.push = async (email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var auth = new Auth({
        email: email,
        hash: hash
    });
    await auth.save();
    return auth;
};

/**
Find authentication credentials
@param {integer} id - Authentication id
*/
authSchema.statics.find = async (id) => {
    var auth = await Auth.findById(id);
    return auth;
};

/**
Delete authentication credentials
@param {integer} id - Authentication id
*/
authSchema.statics.remove = async (id) => {
    var auth = await Auth.findByIdAndRemove(id);
    return auth;
};


/**
Update authentication credentials
@param {integer} id - Authentication id
@param {string} email - Account email
@param {string} password - New desired password
*/
authSchema.statics.update = async (id, email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var auth = await Auth.findByIdAndUpdate(id, {
        email: email, 
        hash: hash
    });
    return auth;
};

// model 
var Auth = mongoose.model('Auth', authSchema, 'auth');

module.exports = Auth;
