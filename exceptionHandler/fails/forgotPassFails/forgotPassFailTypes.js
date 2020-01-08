const {createFailType} = require('../../exceptionTypes');

const failTag = 'ForgotPassword';
/**
 * define list of register fail types
 */
const registerFailTypes = {
    USER_NOT_FOUND: createFailType(failTag,1001, 'User do not exist'),
    USER_DO_NOT_HAVE_EMAIL: createFailType(failTag,1002, 'User do not have E-mail'),
};

module.exports = registerFailTypes;