const {createFailType} = require('../../exceptionTypes');

const failTag = 'ResetPassword';
/**
 * define list of register fail types
 */
const resetPassFailTypes = {
    USER_NOT_FOUND: createFailType(failTag,1001, 'User do not exist'),
    USER_DO_NOT_HAVE_EMAIL: createFailType(failTag,1002, 'User do not have E-mail'),
    USER_ID_REQUIRE: createFailType(failTag, 1003, 'User ID is required'),
    NEW_PASS_REQUIRE: createFailType(failTag, 1004, 'New password is required'),
    TOKEN_REQUIRE: createFailType(failTag, 1005, 'Token is required'),
    RESET_PASS_FAIL: createFailType(failTag, 1006, 'Reset password fail')
};

module.exports = resetPassFailTypes;