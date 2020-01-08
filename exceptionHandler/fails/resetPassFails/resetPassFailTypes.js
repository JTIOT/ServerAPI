const {createFailType} = require('../../exceptionTypes');

const failTag = 'ResetPassword';
/**
 * define list of register fail types
 */
const resetPassFailTypes = {
    USER_ID_REQUIRE: createFailType(failTag, 1001, 'User ID is required'),
    NEW_PASS_REQUIRE: createFailType(failTag, 1002, 'New password is required'),
    TOKEN_REQUIRE: createFailType(failTag, 1003, 'Token is required'),
    RESET_PASS_FAIL: createFailType(failTag, 1004, 'Reset password fail')
};

module.exports = resetPassFailTypes;