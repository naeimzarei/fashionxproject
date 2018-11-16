var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var util = require('../util/util');

util.connect();

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

administratorSchema.statics.push = async (email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var administrator = new Administrator({
        email: email,
        password: hash
    });
    await administrator.save();
    return administrator;
};

administratorSchema.statics.findAdministrator = async (email) => {
    var administrator = await Administrator.findOne({email: email});
    return administrator;
};

administratorSchema.statics.removeAdministrator = async (email) => {
    var administrator = await Administrator.findOneAndRemove({email: email});
    return administrator;
};

administratorSchema.statics.updateCredentials = async (previous_email, email, password) => {
    var hash = await bcrypt.hash(password, 10);
    var administrator = await Administrator.findOneAndUpdate({email: previous_email}, {
        email: email,
        password: hash
    });
    return administrator;
};

administratorSchema.statics.authenticate = async(profile) => {
    var auth = await Administrator.findAdministrator(profile.email);
    if (auth) {
        var result = await bcrypt.compare(profile.password, auth.password);
        return result;
    }
    return false;
};

var Administrator = mongoose.model('Administrator', administratorSchema, 'administrator');

module.exports = Administrator;