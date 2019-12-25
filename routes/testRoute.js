const express = require('express');
const router = express.Router();
const {
    throwError,
    throwFail, 
        } = require('../exceptionHandler/exceptionHandler');
const testErrorTypes = require('../exceptionHandler/testErrors/testErrorTypes');
const testFailTypes = require('../exceptionHandler/testFails/testFailTypes');

const asyncHandler = require('express-async-handler'); 

const {apiKeyValidator} = require('../middlewares/apiKeyValidator');


//test Error handling
router.get('/testError', asyncHandler(async (req, res, next)=>{

    throwError(testErrorTypes.GENERAL_ERROR);
}));

//test fail handling
router.get('/testFail', asyncHandler(async (req, res, next)=>{
    throwFail(testFailTypes.FATAL_FAIL);
}));

router.post('/testJson', asyncHandler(async (req, res, next)=>{

    const data = {message:"this is from server", math:1576575267643, msg:"dd", data:{d1:"ddvd", d2:"fff"}};
    // res.status(200).json(data);
    const data2 = {"code": 500,"message": "Database error"}
    res.success(data2);
}));

//test api key
router.post('/testAPIKey', asyncHandler(apiKeyValidator), asyncHandler(async (req, res, next)=>{

    const data = {
        message:'api key passed'
    }
    res.success({data});
}));

module.exports = router;