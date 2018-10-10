/** Credentials - Handles email and password for influencer login" */
var Credentials = require('../models/Credentials');

var credentials_controller = {};

credentials_controller.push = async (email, password) => {
    return await Credentials.push(email, password);
};

credentials_controller.remove = async (id) => {
    return await Credentials.remove(id);
};

credentials_controller.find = async (id) => {
    return await Credentials.find(id);
};

credentials_controller.update = async (id, email, password) => {
    return await Credentials.update(id, email, password);
};

module.exports = credentials_controller;
