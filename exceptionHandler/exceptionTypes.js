const exceptionTypes = {
    ERROR: 'ERROR_TYPE',
    FAIL: 'FAIL_TYPE'
}

const createErrorType = (errMessage) => {
    return {
        message: errMessage
    }
}

const createFailType = (failCode, failMessage) => {
    return {
        code: failCode,
        message: failMessage
    }
}

module.exports = {
    exceptionTypes,
    createErrorType,
    createFailType
}