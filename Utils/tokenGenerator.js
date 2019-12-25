const jwt = require('jsonwebtoken');
const {jwtPrivateKey} = require('../config/config');
const {throwFail} = require('../exceptionHandler/exceptionHandler');
const {TOKEN_CREATE_FAIL} = require('../exceptionHandler/tokenFails/tokenFailTypes');

/**
 * generate api key
 * @param {*} data 
 */
const generatToken = async (data, expire='1h') => {
    try{
        return await jwt.sign(data, jwtPrivateKey, {expiresIn: expire});
    }
    catch(err){
        console.log('jwt', err);
        throwFail(TOKEN_CREATE_FAIL);
    }
}

module.exports = generatToken;