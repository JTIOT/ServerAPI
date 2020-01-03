const {createFailType} = require('../../exceptionTypes');

const failTag = 'APIKey';
/**
 * define list of register fail types
 */
const apiKeyFailTypes = {
    API_KEY_CREATE_FAIL: createFailType(failTag, 001, 'Unable to create API key'),
    API_KEY_REQUIRE_FAIL: createFailType(failTag, 002, 'API key is required'),
    API_KEY_VERIFY_FAIL: createFailType(failTag, 003, 'API key is invalid')
};

module.exports = apiKeyFailTypes;