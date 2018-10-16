/** Credentials - Handles email and password for influencer login and routes to models/Credentials.js */
var Credentials = require('../models/Credentials');

var credentials_controller = {};

/**
Create authentication credentials
@param {string} email - User email address on account
@param {string} password - Desired password that gets hashed
*/
credentials_controller.push = async (email, password) => {
    return await Credentials.push(email, password);
};

/**
Delete authentication credentials
@param {integer} id - Authentication id
*/
credentials_controller.remove = async (id) => {
    return await Credentials.remove(id);
};

/**
Find authentication credentials
@param {integer} id - Authentication id
*/
credentials_controller.find = async (id) => {
    return await Credentials.find(id);
};

/**
 * Check authentication credentials 
 * @param {string} email the email 
 */
credentials_controller.findCredentials = async (email) => {
    return await Credentials.findCredentials(email);
};

/**
Update authentication credentials
@param {integer} id - Authentication id
@param {string} email - Account email
@param {string} password - New desired password
*/
credentials_controller.update = async (id, email, password) => {
    return await Credentials.update(id, email, password);
};

module.exports = credentials_controller;
