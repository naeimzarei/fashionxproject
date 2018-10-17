/** Handles permissions for each user */
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

/**
Set access level per user
@param {string} email - User account email.
@param {string} rights - Access level to assign to user.
*/
rightsSchema.statics.push = async (email, rights) => {
    var rights = new Rights({
        email: email,
        rights: rights
    })
    await rights.save();
    return rights;
};

/**
Find access level per user
@param {integer} id - User account id.
*/
rightsSchema.statics.find = async (id) => {
    var rights = await Rights.findById(id);
    return rights;
};

/**
 * Find access level per user 
 * @param {string} email 
 */
rightsSchema.statics.findRights = async (email) => {
    var rights = await Rights.findOne({email: email});
    return rights;
};

/**
Remove access level per user
@param {integer} id - User account id.
*/
rightsSchema.statics.remove = async (id) => {
    var rights = await Rights.findByIdAndRemove(id);
    return rights;
};

/**
 * Remove access level per user 
 * @param {string} email 
 */
rightsSchema.statics.removeRights = async (email) => {
    var rights = await Rights.findOneAndRemove({email: email});
    return rights;
};

/**
Update access level per user
@param {integer} id - User account id.
@param {string} email - User account email.
@param {string} rights - New permission level to give to user.
*/
rightsSchema.statics.update = async (id, email, rights) => {
    var rights = await Rights.findByIdAndUpdate(id, {
        email: email,
        rights: rights
    });
    return rights;
};

/**
 * Update access level per user 
 * @param {string} email 
 * @param {string} rights 
 */
rightsSchema.statics.updateRights = async (email, rights) => {
    var rights = await Rights.findOneAndUpdate({email: email}, {
        email: email,
        rights: rights
    });
    return rights;
};

var Rights = mongoose.model('Rights', rightsSchema, 'rights');

module.exports = Rights;
