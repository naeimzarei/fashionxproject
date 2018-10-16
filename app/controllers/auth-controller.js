/** Auth - Handles creating login information for each account and routes to models/Auth.js */
var Auth = require('../models/Auth');

var auth_controller = {};

/**
Create authentication credentials
@param {string} email - User email address on account
@param {string} password - Desired password that gets hashed
*/
auth_controller.push = async (email, password) => {
    return await Auth.push(email, password);
};

/**
Find authentication credentials
@param {integer} id - Authentication id
*/
auth_controller.find = async (id) => {
    return await Auth.find(id);
};

/**
Delete authentication credentials
@param {integer} id - Authentication id
*/
auth_controller.remove = async (id) => {
    return await Auth.remove(id);
};

/**
Update authentication credentials
@param {integer} id - Authentication id
@param {string} email - Account email
@param {string} password - New desired password
*/
auth_controller.update = async (id, email, password) => {
    return await Auth.update(id, email, password);
};

/**
 * Check user is authenticated.
 */
auth_controller.authenticate = async (profile) => {
    return await Auth.authenticate(profile);
};

module.exports = auth_controller;
