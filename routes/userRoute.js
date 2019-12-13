const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

const asyncHandler = require('express-async-handler'); 

router.post('/register', asyncHandler(registerController));

module.exports = router;