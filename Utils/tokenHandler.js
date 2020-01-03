const jwt = require('jsonwebtoken');
const {jwtPrivateKey} = require('../config/config');
const {throwFail} = require('../exceptionHandler/exceptionHandler');
const {
    TOKEN_CREATE_FAIL,
    TOKEN_EXPIRE_FAIL,
    TOKEN_INVAILD_FAIL,
    TOKEN_NOT_ACTIVE_FAIL,
    TOKEN_UNKNOW_FAIL
} = require('../exceptionHandler/tokenFails/tokenFailTypes');

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
        return await jwt.sign(data, secretKey, { expiresIn: expireInSec });
    }
    catch(err){
        console.log('jwt', err);
        throwFail(TOKEN_CREATE_FAIL);
    }
}

const validateToken = async (token, secretKey) => {


    try{

        const decoded = jwt.verify(token, secretKey);
        return decoded
    }
    catch(err){
        console.log('error while validating token ', err);
        
        switch(err.name){
            case 'TokenExpiredError':
                throwFail(TOKEN_EXPIRE_FAIL);
                break;
            case 'JsonWebTokenError':
                throwFail(TOKEN_INVAILD_FAIL);
                break;
            case 'NotBeforeError':
                throwFail(TOKEN_NOT_ACTIVE_FAIL);
                break;
            default:
                throwFail(TOKEN_UNKNOW_FAIL);
        }
    }
}

module.exports = {
    generatToken,
    validateToken
};