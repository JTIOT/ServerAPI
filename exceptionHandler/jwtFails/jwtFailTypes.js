const {createFailType} = require('../exceptionTypes');

/**
 * define list of register fail types
 */
const jwtFailTypes = {
    JWT_CREATE_FAIL: createFailType(1005, 'Unable to create API key'),
};

module.exports = jwtFailTypes;