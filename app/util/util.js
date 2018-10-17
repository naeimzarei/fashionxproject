var util = {};
var config = require('../config/config');
var mongoose = require('mongoose');

util.format_errors_object = (object_info, object) => {
    if (object.validateSync() === undefined) {
        return {};
    }
    var err = object.validateSync().errors;
    var errors = {};
    for (field in object_info) {
        if (err[field]) {
            errors[field] = err[field].message;
        }
    }
    return errors;
};

util.connect = async () => {
    await mongoose.set('useFindAndModify', false);
    return await mongoose.connect(`mongodb+srv://${config.DATABASE_USERNAME}:${config.DATABASE_PASSWORD}@cluster0-zz5rm.mongodb.net/users`, { useNewUrlParser: true, useCreateIndex: true});
};

module.exports = util;