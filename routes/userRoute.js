const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');
const deviceTestController = require('../controllers/deviceTest');
const {
    sendResetPassMail,
    resetPassword
} = require('../controllers/resetPassword');
const apiKeyValidator = require('../middlewares/apiKeyValidator');

const asyncHandler = require('express-async-handler'); 

router.post('/register', asyncHandler(registerController));

router.post('/forgotPassword', asyncHandler(sendResetPassMail));
router.post('/resetPassword', asyncHandler(resetPassword));

router.use(apiKeyValidator);

router.post('/deviceTest', asyncHandler(deviceTestController));

module.exports = router;