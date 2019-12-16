const {createFailType} = require('../exceptionTypes');

const registerFailTypes = {
    USER_EXIST_FAIL: createFailType(1000, 'User name is already in use'),
    USER_NAME_REQUIRED: createFailType(1001, 'User name is required'),
    PASSWORD_REQUIRED: createFailType(1002, 'Password is required'),
    INVALID_MAC: createFailType(1003, 'Device\'s MAC address is invalid')
};

module.exports = registerFailTypes;