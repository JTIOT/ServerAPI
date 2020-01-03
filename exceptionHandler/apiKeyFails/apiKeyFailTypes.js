const {createFailType} = require('../exceptionTypes');

/**
 * define list of register fail types
 */
const apiKeyFailTypes = {
    API_KEY_CREATE_FAIL: createFailType(001, 'Unable to create API key'),
    API_KEY_REQUIRE_FAIL: createFailType(002, 'API key is required'),
    API_KEY_VERIFY_FAIL: createFailType(003, 'API key is invalid')
};

module.exports = apiKeyFailTypes;