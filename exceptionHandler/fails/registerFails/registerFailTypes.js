const {createFailType} = require('../../exceptionTypes');

const failTag = 'Register';
/**
 * define list of register fail types
 */
const registerFailTypes = {
    USER_EXIST_FAIL: createFailType(failTag, 1000, 'User name is already in use'),
    USER_NAME_REQUIRED: createFailType(failTag, 1001, 'User name is required'),
    PASSWORD_REQUIRED: createFailType(failTag, 1002, 'Password is required'),
    INVALID_MAC: createFailType(failTag, 1003, 'Device\'s MAC address is invalid'),
    DEVICE_NOT_IN_STORE: createFailType(failTag, 1004, 'Device is not in store')
};

module.exports = registerFailTypes;