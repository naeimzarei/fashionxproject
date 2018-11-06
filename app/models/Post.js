/** Post - Handles influencers creating posts */
var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });

// schema 
var postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img_url: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    selling_price: {
        type: Number,
        required: true
    },
    original_price: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    clicks: {
        type: Number
    }
});

// instance methods 

// static methods 
/**
Create new post based off of passed in data
*/
postSchema.statics.push = async (
    title,
    email,
    img_url,
    item,
    size,
    brand,
    selling_price,
    original_price,
    condition,
    description
) => {
    var post = new Post({
        title: title,
        email: email,
        img_url: img_url,
        item: item,
        size: size,
        brand: brand,
        selling_price: selling_price,
        original_price: original_price,
        condition: condition,
        description: description,
        clicks: 0
    });
    await post.save();
    return post;
};

/**
Find all posts
@param {string} email - Account email.
*/
postSchema.statics.findAll = async (email) => {
    var post = await Post.find({ email: email }, null);
    return post;
};

/**
Find post
@param {integer} id - Post id.
*/
postSchema.statics.findById = async (id) => {
    var post = await Post.find({ _id: id }, null);
    return post;
};

/**
Delete post
@param {integer} id - Post id.
*/
postSchema.statics.remove = async (id) => {
    var post = await Post.findByIdAndRemove(id);
    return post;
};

/**
Update post with passed in data
@param {integer} id - Post id.
*/
postSchema.statics.update = async (
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
    var post = await Post.findByIdAndUpdate(id, {
        title: title,
        email: email,
        img_url: img_url,
        item: item,
        size: size,
        brand: brand,
        selling_price: selling_price,
        original_price: original_price,
        condition: condition,
        description: description,
        clicks: clicks
    });
    return post;
};

// model
var Post = mongoose.model('Post', postSchema, 'post');

module.exports = Post;
