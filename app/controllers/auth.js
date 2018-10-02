var bcrypt = require('bcrypt');

var Credentials = require('../models/Credentials');
var Auth = require('../models/Auth');

var credentials = new Credentials({email: 'example@gmail.com', password: 'password'});
var auth = new Auth({email: credentials.email, password: credentials.password});

Credentials.create_credentials('example@gmail.com', 'password', function() {
    auth.get_hash(function(hash) {
        authorize(credentials.password, hash);
    });
});

function authorize(password, hash) {
    bcrypt.compare(password, hash, function (err, res) {
        if (res) {
            console.log('match');
        } else {
            console.log('no match');
        }
    });
}