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

authSchema.statics.push = async (email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var auth = new Auth({
        email: email,
        hash: hash
    });
    await auth.save();
    return auth;
};

authSchema.statics.find = async (id) => {
    var auth = await Auth.findById(id);
    return auth;
};

authSchema.statics.remove = async (id) => {
    var auth = await Auth.findByIdAndRemove(id);
    return auth;
};

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