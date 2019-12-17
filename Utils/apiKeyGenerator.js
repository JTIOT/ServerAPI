const jwt = require('jsonwebtoken');
const {FailMetaData} = require('../exceptionHandler/exceptionHandler');
const {JWT_CREATE_FAIL} = require('../exceptionHandler/jwtFails/jwtFailTypes');

const privateKey = 'This is private';

const generateAPIKey = async (data) => {
    try{
        return await jwt.sign(data, privateKey);
    }
    catch(err){
        console.log('jwt', err);
        throw new FailMetaData(JWT_CREATE_FAIL);
    }
}

module.exports = {
    generateAPIKey
}