var Administrator = require('../models/Administrator');

var administrator_controller = {};

administrator_controller.push = async (email, password) => {
    return await Administrator.push(email, password);
};

administrator_controller.findAdministrator = async (email) => {
    return await Administrator.findAdministrator(email);
};

administrator_controller.removeAdministrator = async (email) => {
    return await Administrator.removeAdministrator(email);
};

administrator_controller.updateAdministrator = async (previous_email, email, password) => {
    return await Administrator.updateAdministrator(previous_email, email, password);
};

administrator_controller.authenticate = async (profile) => {
    return await Administrator.authenticate(profile);
}

module.exports = administrator_controller;
