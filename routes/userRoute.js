const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');
const deviceTestController = require('../controllers/deviceTest');
const apiKeyValidator = require('../Utils/apiKeyValidator');

const asyncHandler = require('express-async-handler'); 

router.post('/register', asyncHandler(registerController));

router.use(apiKeyValidator);

router.post('/deviceTest', 
asyncHandler(deviceTestController));

module.exports = router;