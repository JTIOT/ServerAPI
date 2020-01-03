const {createFailType} = require('../exceptionTypes');

/**
 * define list of register fail types
 */
const tokenFailTypes = {
    TOKEN_CREATE_FAIL: createFailType(901, 'Unable to create token'),
    TOKEN_EXPIRE_FAIL: createFailType(902, 'Token is expired'),
    TOKEN_INVAILD_FAIL : createFailType(903, 'Invalid token'),
    TOKEN_NOT_ACTIVE_FAIL: createFailType(904, 'Token not active'),
    TOKEN_UNKNOW_FAIL: createFailType(905, 'Token unknow error')
};

module.exports = tokenFailTypes;