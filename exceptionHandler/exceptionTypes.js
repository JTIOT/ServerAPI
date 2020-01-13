/**
 * define exception types
 */
const exceptionTypes = {
    ERROR: 'ERROR_TYPE',
    FAIL: 'FAIL_TYPE'
}

/**
 * General exception class
 */
class Exception extends Error{

    constructor(){
        super();
    }
}

/**
 * Class which contain error information
 * @property  - errorCode
 *            - errorMessage
 * 
 * constructor take an object which
 * is define as 
 * @type errorType
 * {
 *  message: string
 * }
 */
class ErrorException extends Exception{
    
    constructor(errorMsg){
        super();
        this.type = exceptionTypes.ERROR;
        this.message = errorMsg;
    }
};

/**
 * Class which contain error information
 * @property  - exceptionType
 *            - exceptionCode
 *            - exceptionTag
 *            - exceptionMessage
 * 
 * constructor take an object which
 * is define as 
 * @type failType
 * {
 *  code: number
 *  message: string
 * }
 */
class FailException extends Exception{

    constructor(failCode, failTag, failMsg){
        super();
        this.type = exceptionTypes.FAIL;
        this.code = failCode;
        this.tag = failTag;
        this.message = failMsg;
        this.payload = {};
    }
}

/**
 * create an error type of exception
 * @param {*} errMessage 
 * @return an instance of ErrorException
 */
const createErrorType = (errMessage) => {

    return new ErrorException(errMessage);
}

/**
 *  create an fail type of exception
 * @param {*} failTag - tag this fail belong to, used to categorize fail
 * @param {*} failCode - fail code
 * @param {*} failMessage - fail message
 * @return an instance of FailException
 */
const createFailType = (failTag, failCode, failMessage) => {

    return new FailException(failCode, failTag, failMessage);
}

module.exports = {
    exceptionTypes,
    createErrorType,
    createFailType
}