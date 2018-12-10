/** Administrator - Handles email and password for administrators login  */
var Administrator = require('../models/Administrator');

var administrator_controller = {};

/**
Create authentication credentials
@param {string} email - User email address on account
@param {string} password - Desired password that gets hashed
*/
administrator_controller.push = async (email, password) => {
    return await Administrator.push(email, password);
};

/**
 * Check authentication credentials 
 * @param {string} email the email 
 */
administrator_controller.findAdministrator = async (email) => {
    return await Administrator.findAdministrator(email);
};

/**
 * Find all credentials of influencers 
 */
administrator_controller.findAllAdministrators = async () => {
    return await Administrator.findAllAdministrators();
};

/**
 * Delete authentication credentials
 * @param {string} email 
 */
administrator_controller.removeAdministrator = async (email) => {
    return await Administrator.removeAdministrator(email);
};

/**
 * Update authentication credentials
 * @param {string} previous_email
 * @param {string} email
 * @param {string} password 
 */
administrator_controller.updateAdministrator = async (previous_email, email, password) => {
    return await Administrator.updateAdministrator(previous_email, email, password);
};

/**
 * Check user is authenticated.
 */
administrator_controller.authenticate = async (profile) => {
    return await Administrator.authenticate(profile);
}

module.exports = administrator_controller;
