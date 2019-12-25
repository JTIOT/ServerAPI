const {createFailType} = require('../exceptionTypes');

/**
 * define list of register fail types
 */
const tokenFailTypes = {
    TOKEN_CREATE_FAIL: createFailType(1005, 'Unable to create token'),
};

module.exports = tokenFailTypes;