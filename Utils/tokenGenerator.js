const jwt = require('jsonwebtoken');
const {jwtPrivateKey} = require('../config/config');
const {throwFail} = require('../exceptionHandler/exceptionHandler');
const {TOKEN_CREATE_FAIL} = require('../exceptionHandler/tokenFails/tokenFailTypes');

/**
 * generate api key
 * @param {*} data - data that will be used to generate token
 * @param {*} expireInSec - seconds before token expired
 */
const generatToken = async (data, expireInSec=3600) => {
    try{
        return await jwt.sign(data, jwtPrivateKey, {expiresIn: expireInSec});
    }
    catch(err){
        console.log('jwt', err);
        throwFail(TOKEN_CREATE_FAIL);
    }
}

module.exports = generatToken;