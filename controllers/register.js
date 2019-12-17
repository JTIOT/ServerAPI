const {
    queryHandler,
    registerUser,
    userExist,
    deviceInStore
} = require('../database/queryUtil/queryUtil');

const {cusomterInfoSchema} = require('../database/schema/initSchema');
const {FailMetaData} = require('../exceptionHandler/exceptionHandler');

const {
    USER_EXIST_FAIL,
    USER_NAME_REQUIRED,
    PASSWORD_REQUIRED,
    INVALID_MAC,
    DEVICE_NOT_IN_STORE
} = require('../exceptionHandler/registerFails/registerFailTypes');

const moment = require('moment');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');

const {generateAPIKey} = require('../Utils/apiKeyGenerator');

/**
 * setup initial schema
 */
const getInitialSchema = ()=>{

    const keyId = moment().format('YYYYMMDDhhmmssSSS');
    const insertYmd = keyId;
    const updateYmd = keyId;
    const insertId = 'SYSTEM';
    const updateId = insertId;
    const balAccount = uniqid();

    const ret = {...cusomterInfoSchema,
        keyId,
        balAccount,
        insertYmd,
        insertId,
        updateYmd,
        updateId
    }

    return ret;
}

/**
 * Check if device mac is valid
 * @param {*} mac 
 */
const isValidMac = (mac) => {

    if(mac){
        return mac.split(':').length === 6? true : false;
    }

    return false;
}

/**
 * register user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const register = async (req, res, next) => {
    
    const {userName, password, mac} = req.body;

    //user name is empty
    if(!userName){
        throw new FailMetaData(USER_NAME_REQUIRED);
    }

    //password is empty
    if(!password){
        throw new FailMetaData(PASSWORD_REQUIRED);
    }

    //is device mac valid?
    if(!isValidMac(mac)){
        throw new FailMetaData(INVALID_MAC);
    }

    //check if user name is used
    const userInUsed = await queryHandler(userExist, userName);

    if(userInUsed){
        //user do exist in DB
        throw new FailMetaData(USER_EXIST_FAIL);
    }

    //check if device is in store
    const devicePublished = await queryHandler(deviceInStore, mac);


    //device not in store
    if(!devicePublished){
        //user do exist in DB
        throw new FailMetaData(DEVICE_NOT_IN_STORE);
    }
    else{
        //user does not exist in DB

        //get initial schema
        const registerSchema = getInitialSchema();

        //setup schema
        registerSchema.homeTel = userName;
        const hashedPassword = await bcrypt.hash(password, 10);
        registerSchema.password = hashedPassword;

        //insert user data into DB
        await queryHandler(registerUser, registerSchema, mac);

        //generate api key
        const apiKey = await generateAPIKey({
            userId: registerSchema.balAccount,
            userName: registerSchema.homeTel
        })

        //response data
        const data = {
            userId: registerSchema.balAccount,
            userName: registerSchema.homeTel,
            apiKey: apiKey
        };
        res.success({data});
    } 
};

module.exports = register;