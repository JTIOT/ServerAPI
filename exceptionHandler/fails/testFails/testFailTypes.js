const {createFailType} = require('../../exceptionTypes');

const failTag = 'Test';
const testFailTypes = {
    GENERAL_FAIL: createFailType(failTag, 101, 'General fail'),
    FATAL_FAIL: createFailType(failTag, 111, 'A fatal fail')
};

module.exports = testFailTypes;