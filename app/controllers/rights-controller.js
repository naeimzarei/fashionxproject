/** Rights - Handles permissions for influencers, moderators, and administrators */
var Rights = require('../models/Rights');

var rights_controller = {};

rights_controller.push = async(email, rights) => {
    return await Rights.push(email, rights);
};

rights_controller.find = async(id) => {
    return await Rights.find(id);
};

rights_controller.remove = async(id) => {
    return await Rights.remove(id);
};

rights_controller.update = async(id, email, rights) => {
    return await Rights.update(id, email, rights);
};

module.exports = rights_controller;
