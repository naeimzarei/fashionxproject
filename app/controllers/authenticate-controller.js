var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt');

var credentials_controller = require('../controllers/credentials-controller')

var authenticate_controller = {};

authenticate_controller.strategy = () => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            var credentials = await credentials_controller.findCredentials(email)
            if (credentials) {
                var result = await authenticateCredentials(email, password);
                if (result) {
                    console.log('here 1');
                    return done(null, credentials);
                } else {
                    console.log('here 2');
                    return done(null, false);
                }
            } else {
                console.log('here 3');
                return done(null, false);
            }
        }
    ))

    passport.serializeUser((credentials, done) => {
        done(null, credentials.id);
    });

    passport.deserializeUser(async (id, done) => {
        var credentials = await credentials_controller.find(id);
        done(null, credentials);
    });
}

/**
 * Check that the user is authenticated
 * @param {{}} profile the profile object 
 */
authenticateCredentials = async(email, password) => {
    var auth = await credentials_controller.findCredentials(email);
    if (auth) {
        var result = await bcrypt.compare(password, auth.password);
        return result;
    }
    return false;
};

module.exports = authenticate_controller;