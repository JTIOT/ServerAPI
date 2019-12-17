/**
 * define exception types
 */
const exceptionTypes = {
    ERROR: 'ERROR_TYPE',
    FAIL: 'FAIL_TYPE'
}

/**
 * create an error type of exception
 * @param {*} errMessage 
 */
const createErrorType = (errMessage) => {
    return {
        type:exceptionTypes.ERROR,
        message: errMessage
    }
}

/**
 *  create an fail type of exception
 * @param {*} failCode 
 * @param {*} failMessage 
 */
const createFailType = (failCode, failMessage) => {
    return {
        type:exceptionTypes.FAIL,
        code: failCode,
        message: failMessage
    }
}

module.exports = {
    exceptionTypes,
    createErrorType,
    createFailType
}