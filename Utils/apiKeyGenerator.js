const jwt = require('jsonwebtoken');
const {jwtPrivateKey} = require('../config/config');
const {throwFail} = require('../exceptionHandler/exceptionHandler');
const {API_KEY_CREATE_FAIL} = require('../exceptionHandler/apiKeyFails/apiKeyFailTypes');

/**
 * generate api key
 * @param {*} data 
 */
const generateAPIKey = async (data) => {
    try{
        return await jwt.sign(data, jwtPrivateKey, {});
    }
    catch(err){
        console.log('jwt', err);
        throwFail(API_KEY_CREATE_FAIL);
    }
}

module.exports = generateAPIKey;