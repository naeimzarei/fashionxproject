
var minimist = require('minimist');
var administrator_controller = require('../controllers/administrator-controller');
var rights_controller = require('../controllers/rights-controller');
var VALIDATION_ERRORS = require('../util/util').VALIDATION_ERRORS;

var credentials = minimist(process.argv.slice(2));

if (credentials.email === undefined) {
    console.log(`Email not provided. Make sure to enter your command as follow: node admin.js --email myemail@myprovider.com`);
    process.exit();
}

// check if email has valid syntax 
if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(credentials['email']) === false) {
    console.log(VALIDATION_ERRORS['EMAIL_INVALID_SYNTAX']);
    process.exit();
}

// check if email already exists
var result = new Promise(async (resolve, reject) => {
    var res = await administrator_controller.findAdministrator(credentials['email']) ? true : false;
    resolve(res);
});

result.then(async (res) => {
    if (res === false) {
        console.log(VALIDATION_ERRORS['EMAIL_DOES_NOT_EXIST'])
        process.exit();
    }
    await administrator_controller.removeAdministrator(credentials['email']);
    await rights_controller.removeRights(credentials['email']);
    console.log('Successfully removed administrator with the provided email.');
    process.exit();
});