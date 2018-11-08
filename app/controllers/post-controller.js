/** Post - Handles influencer account creation and contains all collected body information and routes to models/Post.js */
var Post = require('../models/Post');

var post_controller = {};

/**
Create new Post based off of passed in data
*/
post_controller.push = async (
    title,
    email,
    img_url,
    item,
    size,
    brand,
    selling_price,
    original_price,
    condition,
    description,
    clicks
) => {
    return await Post.push(
        title,
        email,
        img_url,
        item,
        size,
        brand,
        selling_price,
        original_price,
        condition,
        description,
        clicks
    );
};

/**
Find all Posts belonging to an email
@param {string} email - Account email.
*/
post_controller.findAll = async (email) => {
    return await Post.findAll(email);
};

/**
Find Post
@param {integer} id - Post id.
*/
post_controller.find = async (id) => {
    return await Post.findById(id);
};

/**
Delete Post
@param {integer} id - Post id.
*/
post_controller.remove = async(id) => {
    return await Post.remove(id);
};

/**
Update Post with passed in data
@param {integer} id - Post id.
*/
post_controller.update = async (
    title,
    email,
    img_url,
    item,
    size,
    brand,
    selling_price,
    original_price,
    condition,
    description,
    clicks
) => {
    return await Post.update(
        title,
        email,
        img_url,
        item,
        size,
        brand,
        selling_price,
        original_price,
        condition,
        description,
        clicks
    );
}

post_controller.updatePost = async(
    title,
    email,
    img_url,
    item,
    size,
    brand,
    selling_price,
    original_price,
    condition,
    description,
    clicks
) => {
    return await Post.updatePost(
        title,
        email,
        img_url,
        item,
        size,
        brand,
        selling_price,
        original_price,
        condition,
        description,
        clicks
    );
}

module.exports = post_controller;
