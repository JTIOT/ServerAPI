const jwt = require('jsonwebtoken');
const {jwtPrivateKey} = require('../config/config');
const {throwFail} = require('../exceptionHandler/exceptionHandler');
const {
    API_KEY_REQUIRE_FAIL,
     API_KEY_VERIFY_FAIL
    } = require('../exceptionHandler/fails/apiKeyFails/apiKeyFailTypes');

/**
 *  validate an api key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const apiKeyValidator = (req, res, next) => {
    const {apiKey} = req.body;

    if(apiKey){
        try{
            jwt.verify(apiKey, jwtPrivateKey);
            return next();

        }
        catch(err){
            console.log('verify api key error ', err);
            throwFail(API_KEY_VERIFY_FAIL);
        }
    }

    throwFail(API_KEY_REQUIRE_FAIL);
}

module.exports = apiKeyValidator;