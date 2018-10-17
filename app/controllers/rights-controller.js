/** Rights - Handles permissions for influencers, moderators, and administrators and routes to models/Rights.js */
var Rights = require('../models/Rights');

var rights_controller = {};

/**
Set access level per user
@param {string} email - User account email.
@param {string} rights - Access level to assign to user.
*/
rights_controller.push = async(email, rights) => {
    return await Rights.push(email, rights);
};

/**
Find access level per user
@param {integer} id - User account id.
*/
rights_controller.find = async(id) => {
    return await Rights.find(id);
};

/**
 * Find access level per user 
 * @param {string} email 
 */
rights_controller.findRights = async (email) => {
    return await Rights.findRights(email);
};

/**
Remove access level per user
@param {integer} id - User account id.
*/
rights_controller.remove = async(id) => {
    return await Rights.remove(id);
};

/**
 * Remove access level per user 
 * @param {string} email 
 */
rights_controller.removeRights = async (email) => {
    return await Rights.removeRights(email);
};

/**
Update access level per user
@param {integer} id - User account id.
@param {string} email - User account email.
@param {string} rights - New permission level to give to user.
*/
rights_controller.update = async(id, email, rights) => {
    return await Rights.update(id, email, rights);
};

/**
 * Update access level per user 
 * @param {string} email 
 * @param {string} rights 
 */
rights_controller.updateRights = async (email, rights) => {
    return await Rights.updateRights(email, rights);
};

module.exports = rights_controller;
