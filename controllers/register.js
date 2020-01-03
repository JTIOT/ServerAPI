const {
    registerUser,
    userExist,
    deviceInStore
} = require('../database/queryUtil/queryUtil');

const {cusomterInfoSchema} = require('../database/schema/initSchema');
const {throwFail} = require('../exceptionHandler/exceptionHandler');

const {
    USER_EXIST_FAIL,
    USER_NAME_REQUIRED,
    PASSWORD_REQUIRED,
    INVALID_MAC,
    DEVICE_NOT_IN_STORE
} = require('../exceptionHandler/fails/registerFails/registerFailTypes');

const moment = require('moment');
const uniqid = require('uniqid');
const {hashPassword} = require('../Utils/passwordHandler');

const generateAPIKey = require('../Utils/apiKeyGenerator');

/**
 * setup initial schema
 */
const getInitialSchema = ()=>{

    const keyId = moment().format('YYYYMMDDhhmmss');
    const insertYmd = keyId;
    const updateYmd = keyId;
    const insertId = 'SYSTEM';
    const updateId = insertId;
    const openTime = keyId;
    const balAccount = uniqid();

    const ret = {...cusomterInfoSchema,
        keyId,
        balAccount,
        insertYmd,
        insertId,
        updateYmd,
        updateId,
        openTime
    }

    return ret;
}

/**
 * Check if device mac is valid
 * @param {*} mac 
 */
const isValidMac = (mac) => {

    console.log('validate mac format ', mac);
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

    const {userName, password, mac, email} = req.body;

    //user name is empty
    if(!userName){
        throwFail(USER_NAME_REQUIRED);
    }

    //password is empty
    if(!password){
        throwFail(PASSWORD_REQUIRED);
    }

    //is device mac valid?
    if(!isValidMac(mac)){
        throwFail(INVALID_MAC);
    }

    //check if user name is used
    // const userInUsed = await queryHandler(userExist, userName);
    const userInUsed = await userExist(userName);

    if(userInUsed){
        //user do exist in DB
        throwFail(USER_EXIST_FAIL);
    }

    //check if device is in store
    const devicePublished = await deviceInStore(mac);


    //device not in store
    if(!devicePublished){
        //user do exist in DB
        throwFail(DEVICE_NOT_IN_STORE);
    }
    else{
        //user does not exist in DB

        //get initial schema
        const registerSchema = getInitialSchema();

        //setup schema
        registerSchema.homeTel = userName;
        const hashedPassword = await hashPassword(password);
        registerSchema.password = hashedPassword;
        registerSchema.Email = email;

        //insert user data into DB
        await registerUser(registerSchema, mac);

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