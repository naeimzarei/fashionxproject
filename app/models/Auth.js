var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://tester:naeim410@cluster0-zz5rm.mongodb.net/users', { useNewUrlParser: true });

// schema 
var authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hash: {
        type: String
    }
});

// static methods
authSchema.methods.get_hash = function (callback) {
    Auth.findOne({email: this.email}, 'password', function (err, credentials) {
        if (err) throw err;
        this.hash = credentials.password;
        callback(this.hash);
    });
};

// instance methods 

// model 
var Auth = mongoose.model('Auth', authSchema, 'credentials');

module.exports = Auth;