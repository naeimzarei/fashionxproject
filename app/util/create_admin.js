
var minimist = require('minimist');
var administrator_controller = require('../controllers/administrator-controller');
var rights_controller = require('../controllers/rights-controller');
var VALIDATION_ERRORS = require('../util/util').VALIDATION_ERRORS;

var credentials = minimist(process.argv.slice(2));

if (credentials.email === undefined || credentials.password === undefined) {
    console.log(`Email and or password not provided. Make sure to enter your command as follow: node admin.js --email myemail@myprovider.com --password mypassword`);
    process.exit();
}

// check if email has valid syntax 
if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(credentials['email']) === false) {
    console.log(VALIDATION_ERRORS['EMAIL_INVALID_SYNTAX']);
    process.exit();
}

// check if password is valid 
if(/^((?=.*\d)(?=.*[A-Z])).{6,20}$/.test(credentials['password']) === false ){
    console.log(VALIDATION_ERRORS['PASSWORD_INVALID']);
    process.exit();
}

// check if email already exists
var result = new Promise(async (resolve, reject) => {
    var res = await administrator_controller.findAdministrator(credentials['email']) ? true : false;
    resolve(res);
});

result.then(async (res) => {
    if (res) {
        console.log(VALIDATION_ERRORS['EMAIL_DUPLICATE']);
        process.exit();
    }
    await administrator_controller.push(credentials['email'], credentials['password']);
    await rights_controller.push(credentials['email'], 2);
    console.log('Successfully created an administrator with provided credentials.');
    process.exit();
});
