const express = require('express');
const router = express.Router();
const {
    throwError,
    throwFail, 
        } = require('../exceptionHandler/exceptionHandler');
const testErrorTypes = require('../exceptionHandler/testErrors/testErrorTypes');
const testFailTypes = require('../exceptionHandler/testFails/testFailTypes');

const asyncHandler = require('express-async-handler'); 

const {apiKeyValidator} = require('../Utils/apiKeyValidator');


//test Error handling
router.get('/testError', asyncHandler(async (req, res, next)=>{

    throwError(testErrorTypes.GENERAL_ERROR);
}));

//test fail handling
router.get('/testFail', asyncHandler(async (req, res, next)=>{
    throwFail(testFailTypes.FATAL_FAIL);
}));

//test api key
router.post('/testAPIKey', asyncHandler(apiKeyValidator), asyncHandler(async (req, res, next)=>{

    const data = {
        message:'api key passed'
    }
    res.success({data});
}));

module.exports = router;