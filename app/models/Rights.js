var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });

// schema 
var rightsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    rights: {
        type: String,
        required: true
    }
});

rightsSchema.statics.push = async (email, rights) => {
    var rights = new Rights({
        email: email,
        rights: rights
    })
    await rights.save();
    return rights;
};

rightsSchema.statics.find = async (id) => {
    var rights = await Rights.findById(id);
    return rights;
};

rightsSchema.statics.remove = async (id) => {
    var rights = await Rights.findByIdAndRemove(id);
    return rights;
};

rightsSchema.statics.update = async (id, email, rights) => {
    var rights = await Rights.findByIdAndUpdate(id, {
        email: email,
        rights: rights
    });
    return rights;
};

var Rights = mongoose.model('Rights', rightsSchema, 'rights');

module.exports = Rights;