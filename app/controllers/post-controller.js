/** Post - Handles influencer account creation and contains all collected body information and routes to models/Post.js */
var Post = require('../models/Post');

var Post_controller = {};

/**
Create new Post based off of passed in data
*/
Post_controller.push = async (
    title,
    date,
    img_url,
    clicks
) => {
    return await Post.push(
        title,
        date,
        img_url,
        clicks
    );
};

/**
Find Post
@param {integer} id - Post id.
*/
Post_controller.find = async (id) => {
    return await Post.find(id);
};

/**
Delete Post
@param {integer} id - Post id.
*/
Post_controller.remove = async(id) => {
    return await Post.remove(id);
};

/**
Update Post with passed in data
@param {integer} id - Post id.
*/
Post_controller.update = async (
    title,
    date,
    img_url,
    clicks
) => {
    return await Post.update(
        title,
        date,
        img_url,
        clicks
    );
}

Post_controller.updatePost = async(
    title,
    date,
    img_url,
    clicks
) => {
    return await Post.updatePost(
        title,
        date,
        img_url,
        clicks
    );
}

module.exports = Post_controller;
