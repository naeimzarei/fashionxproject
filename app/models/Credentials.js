var mongoose = require('mongoose');
let bcrypt = require('bcrypt');
var config = require('../config/config');

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
credentialsSchema.statics.push = async (email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var credentials = new Credentials({
        email: email,
        password: hash
    });
    await credentials.save();
    return credentials;
};

credentialsSchema.statics.find = async (id) => {
    var credentials = await Credentials.findById(id);
    return credentials;
};

credentialsSchema.statics.remove = async (id) => {
    var credentials = await Credentials.findByIdAndRemove(id);
    return credentials;
};

credentialsSchema.statics.update = async (id, email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var credentials = await Credentials.findByIdAndUpdate(id, {
        email: email,
        password: hash
    });
    return credentials;
};

// instance methods 

// model
var Credentials = mongoose.model('Credentials', credentialsSchema, 'credentials');

module.exports = Credentials;