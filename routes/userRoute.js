const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');
const deviceTestController = require('../controllers/deviceTest');
const {sendResetPassMail} = require('../controllers/resetPassword');
const apiKeyValidator = require('../middlewares/apiKeyValidator');

const asyncHandler = require('express-async-handler'); 

router.post('/register', asyncHandler(registerController));

router.get('/resetPassword', asyncHandler(async (req, res)=>{

    const {token} = req.param;
    console.log('entry token ', token);
    res.success();
}));

router.post('/resetPassword', asyncHandler(sendResetPassMail));

router.use(apiKeyValidator);

router.post('/deviceTest', asyncHandler(deviceTestController));

module.exports = router;