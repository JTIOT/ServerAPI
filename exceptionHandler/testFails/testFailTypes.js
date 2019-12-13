const {createFailType} = require('../exceptionTypes');

const testFailTypes = {
    GENERAL_FAIL: createFailType(101, 'General fail'),
    FATAL_FAIL: createFailType(111, 'A fatal fail')
};

module.exports = testFailTypes;