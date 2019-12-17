const {exceptionTypes} = require('./exceptionTypes');

/**
 * General exception class
 */
class ExceptionMetaData extends Error{

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
class ErrorMetaData extends ExceptionMetaData{
    
    constructor(errorType){
        super();
        this.exceptionType = exceptionTypes.ERROR;
        this.exceptionMessage = errorType.message;
    }
};

/**
 * Handling express route error
 *
 * @return json object with error message
 */
const errorHandler = async (excp, req, res, next) => {

    if(excp.exceptionType === exceptionTypes.ERROR){

        return res.error({
            error:{
                message:excp.exceptionMessage
            }
        });
    }
    
    next(excp);
};

/**
 * Class which contain error information
 * @property  - exceptionType
 *            - exceptionCode
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
class FailMetaData extends ExceptionMetaData{

    constructor(failType){
        super();
        this.exceptionType = exceptionTypes.FAIL;
        this.exceptionCode = failType.code;
        this.exceptionMessage = failType.message;
    }
}

/**
 * Handling express route fail
 *
 * @return json object with fail code and message
 */
const failHandler = async (excp, req, res, next) => {
    if(excp.exceptionType === exceptionTypes.FAIL){
        
       return res.fail({
            error:{
                message: excp.exceptionMessage,
                errors:{
                    stateCode: excp.exceptionCode
                }
            }
        });
    }

    next(excp);
}

module.exports = {
    ErrorMetaData,
    FailMetaData,
    /**
     * handle fail and error type of exception
     */
    ExceptionHandler: [
        failHandler, 
        errorHandler
    ]
};