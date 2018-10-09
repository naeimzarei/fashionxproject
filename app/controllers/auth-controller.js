var Auth = require('../models/Auth');

var auth_controller = {};

auth_controller.push = async (email, password) => {
    return await Auth.push(email, password);
};

auth_controller.find = async (id) => {
    return await Auth.find(id);
};

auth_controller.remove = async (id) => {
    return await Auth.remove(id);
};

auth_controller.update = async (id, email, password) => {
    return await Auth.update(id, email, password);
};

module.exports = auth_controller;