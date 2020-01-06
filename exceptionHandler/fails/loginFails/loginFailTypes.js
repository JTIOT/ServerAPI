const {createFailType} = require('../../exceptionTypes');

const failTag = 'Login';
/**
 * define list of register fail types
 */
const registerFailTypes = {
    USERNAME_REQUIRE: createFailType(failTag, 1000, 'User name is required'),
    PASSWORD_REQUIRE: createFailType(failTag, 1001, 'password is required'),
    USER_NOT_EXIST: createFailType(failTag, 1002, 'User name do not exist'),
    LOGIN_FAIL: createFailType(failTag, 1003, 'Login fail'),
    PASSWORD_INVALID: createFailType(failTag, 1004, 'Password is invalid'),
    USER_MAC_MISSING: createFailType(failTag, 1005, 'User device mac missing')
};

module.exports = registerFailTypes;