/** Post - Handles influencers creating posts */
var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });

// schema 
var postSchema = mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
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
    date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img_urls: {
        type: Array,
        required: true
    }
});

// instance methods 

// static methods 
/**
Create new post based off of passed in data
*/
postSchema.statics.push = async (
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
    var post = new Post({
        item: item,
        type: type,
        size: size,
        brand: brand,
        selling_price: selling_price,
        original_price: original_price,
        condition: condition,
        description: description,
        date: date,
        email: email,
        img_urls: img_urls
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
    var post = await Post.findByIdAndUpdate(id, {
        item: item,
        type: type,
        size: size,
        brand: brand,
        selling_price: selling_price,
        original_price: original_price,
        condition: condition,
        description: description,
        date: date,
        email: email,
        img_urls: img_urls
    });
    return post;
};

// model
var Post = mongoose.model('Post', postSchema, 'post');

module.exports = Post;
