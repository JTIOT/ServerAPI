const {
    exceptionTypes,
    ErrorException,
    FailException
} = require('./exceptionTypes');


/**
 * express middleware for error handling on error exception
 *
 * @return json object with error message
 */
const errorHandler = async (excp, req, res, next) => {

    if(excp.type === exceptionTypes.ERROR){

        return res.error({
            error:{
                message:excp.message
            }
        });
    }
    
    next(excp);
};

/**
 * express middleware for error handling on fail exception
 *
 * @return json object with fail code and message
 */
const failHandler = async (excp, req, res, next) => {
    if(excp.type === exceptionTypes.FAIL){
        
       return res.fail({
            error:{
                message: excp.message,
                errors:{
                    state: {
                        stateCode:excp.code,
                        stateTag:excp.tag
                    }
                }
            }
        });
    }

    next(excp);
}

/**
 * Throw an error exception
 * @param {*} type an instance of ErrorException class
 */
const throwError = (type) => {
    if(type.type !== exceptionTypes.ERROR){
        throw new Error(`throwError function received none error type exception ${type}`);
    }
    throw type;
}

/**
 * Throw an fail exception
 * @param {*} type an instance of FailException
 */
const throwFail = (type) => {
    
    if(type.type !== exceptionTypes.FAIL){
        throw new Error(`throwFail function received none fail type exception ${type}`);
    }
    throw type;
}

module.exports = {
    throwError,
    throwFail,
    /**
     * handle fail and error type of exception
     * add this to express to handle route error
     * e.g express().use(ExceptionHandler)
     */
    ExceptionHandler: [
        failHandler, 
        errorHandler
    ]
};