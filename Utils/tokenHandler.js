const jwt = require('jsonwebtoken');
const {jwtPrivateKey} = require('../config/config');
const {throwFail} = require('../exceptionHandler/exceptionHandler');
const {TOKEN_CREATE_FAIL} = require('../exceptionHandler/tokenFails/tokenFailTypes');

/**
 * generate api key
 * @param {*} data - data that will be used to generate token
 * @param {*} secretKey - secret key to generate token, system secret key is used if
 * not provided
 * @param {*} expireInSec - seconds before token expired, default 3600 seconds
 */
const generatToken = async (data, secretKey=jwtPrivateKey, expireInSec=3600) => {
    try{
        console.log('sign token with secret ', secretKey);
        return await jwt.sign(data, secretKey);
    }
    catch(err){
        console.log('jwt', err);
        throwFail(TOKEN_CREATE_FAIL);
    }
}

const validateToken = async (token, secretKey) => {


    try{

        const decoded = jwt.verify(token, secretKey);
        if(decoded){
            return true;
        }
    }
    catch(err){
        console.log('error while validating token ', err);
            return false;
    }
}

module.exports = {
    generatToken,
    validateToken
};