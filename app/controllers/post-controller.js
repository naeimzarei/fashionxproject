/** Post - Handles influencer account creation and contains all collected body information and routes to models/Post.js */
var Post = require('../models/Post');
const nodemailer = require('nodemailer');

var post_controller = {};

/**
Create new Post based off of passed in data
*/
post_controller.push = async (
    item,
    type,
    size,
    brand,
    selling_price,
    original_price,
    condition,
    description,
    date,
    email,
    img_urls
) => {
    return await Post.push(
        item,
        type,
        size,
        brand,
        selling_price,
        original_price,
        condition,
        description,
        date,
        email,
        img_urls
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
    item,
    type,
    size,
    brand,
    selling_price,
    original_price,
    condition,
    description,
    date,
    email,
    img_urls
) => {
    return await Post.update(
        item,
        type,
        size,
        brand,
        selling_price,
        original_price,
        condition,
        description,
        date,
        email,
        img_urls
    );
}

post_controller.update = async(
    id,
    item,
    type,
    size,
    brand,
    selling_price,
    original_price,
    condition,
    description,
    date,
    email,
    img_urls
) => {
    return await Post.update(
        id,
        item,
        type,
        size,
        brand,
        selling_price,
        original_price,
        condition,
        description,
        date,
        email,
        img_urls
    );
}

module.exports = post_controller;
