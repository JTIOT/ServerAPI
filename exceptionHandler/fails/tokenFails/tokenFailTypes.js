const {createFailType} = require('../../exceptionTypes');

const failTag = 'Token';
/**
 * define list of register fail types
 */
const tokenFailTypes = {
    TOKEN_CREATE_FAIL: createFailType(failTag, 901, 'Unable to create token'),
    TOKEN_EXPIRE_FAIL: createFailType(failTag, 902, 'Token is expired'),
    TOKEN_INVAILD_FAIL : createFailType(failTag, 903, 'Invalid token'),
    TOKEN_NOT_ACTIVE_FAIL: createFailType(failTag, 904, 'Token not active'),
    TOKEN_UNKNOW_FAIL: createFailType(failTag, 905, 'Token unknow error')
};

module.exports = tokenFailTypes;