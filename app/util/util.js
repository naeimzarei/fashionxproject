var util = {};

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

module.exports = util;