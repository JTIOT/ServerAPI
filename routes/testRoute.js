const express = require('express');
const router = express.Router();
const {
    ErrorMetaData,
    FailMetaData, 
        } = require('../exceptionHandler/exceptionHandler');
const testErrorTypes = require('../exceptionHandler/testErrors/testErrorTypes');
const testFailTypes = require('../exceptionHandler/testFails/testFailTypes');

const asyncHandler = require('express-async-handler'); 


//test Error handling
router.get('/testError', asyncHandler(async (req, res, next)=>{

    throw new ErrorMetaData(testErrorTypes.GENERAL_ERROR);
}));

//test fail handling
router.get('/testFail', asyncHandler(async (req, res, next)=>{
    throw new FailMetaData(testFailTypes.FATAL_FAIL);
}));

module.exports = router;