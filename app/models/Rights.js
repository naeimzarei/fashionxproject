var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true });

// schema 
var rightsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    rights: {
        type: String,
        required: true
    }
});

var Rights = mongoose.model('Rights', rightsSchema, 'rights');
module.exports = Rights;