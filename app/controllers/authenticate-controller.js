var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt');

var credentials_controller = require('../controllers/credentials-controller')

var authenticate_controller = {};

// set up the passport js strategy 
/* istanbul ignore next */
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
                    return done(null, credentials);
                } else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        }
    ))

    // serialize the user given the user's credential id 
    passport.serializeUser((credentials, done) => {
        done(null, credentials.id);
    });

    // deserialize the user given the user's session id 
    passport.deserializeUser(async (id, done) => {
        var credentials = await credentials_controller.findByIds(id);
        done(null, credentials);
    });
}

/**
 * Check that the user is authenticated
 * @param {{}} profile the profile object 
 */
/* istanbul ignore next */
authenticateCredentials = async(email, password) => {
    var auth = await credentials_controller.findCredentials(email);
    if (auth) {
        var result = await bcrypt.compare(password, auth.password);
        return result;
    }
    return false;
};

module.exports = authenticate_controller;