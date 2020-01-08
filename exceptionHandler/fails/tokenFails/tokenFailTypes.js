const {createFailType} = require('../../exceptionTypes');

const failTag = 'Token';
/**
 * define list of register fail types
 */
const tokenFailTypes = {
    TOKEN_CREATE_FAIL: createFailType(failTag, 1000, 'Unable to create token'),
    TOKEN_EXPIRE_FAIL: createFailType(failTag, 1001, 'Token is expired'),
    TOKEN_INVAILD_FAIL : createFailType(failTag, 1002, 'Invalid token'),
    TOKEN_NOT_ACTIVE_FAIL: createFailType(failTag, 1003, 'Token not active'),
    TOKEN_UNKNOW_FAIL: createFailType(failTag, 1004, 'Token unknown error')
};

module.exports = tokenFailTypes;