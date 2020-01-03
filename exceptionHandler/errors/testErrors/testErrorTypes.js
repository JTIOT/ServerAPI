const {createErrorType} = require('../../exceptionTypes');

const testErrorTypes = {
    GENERAL_ERROR: createErrorType('General error'),
    FATAL_ERROR: createErrorType('A fatal error occured')
};

module.exports = testErrorTypes;