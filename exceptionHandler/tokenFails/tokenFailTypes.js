const {createFailType} = require('../exceptionTypes');

/**
 * define list of register fail types
 */
const tokenFailTypes = {
    TOKEN_CREATE_FAIL: createFailType(1001, 'Unable to create token'),
    TOKEN_EXPIRE_FAIL: createFailType(1002, 'Token is expired'),
    TOKEN_INVAILD_FAIL : createFailType(1003, 'Invalid token'),
    TOKEN_NOT_ACTIVE_FAIL: createFailType(1004, 'Token not active'),
    TOKEN_UNKNOW_FAIL: createFailType(1005, 'Token unknow error')
};

module.exports = tokenFailTypes;