const {
    registerUser,
    findUser
} = require('../database/queryHandler/queryHandler');
const {cusomterInfoSchema} = require('../database/schema/initSchema');
const {FailMetaData} = require('../exceptionHandler/exceptionHandler');
const {
    USER_EXIST_FAIL,
    USER_NAME_REQUIRED,
    PASSWORD_REQUIRED,
    INVALID_MAC
} = require('../exceptionHandler/registerFails/registerFailTypes');
const moment = require('moment');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');

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

const isValidMac = (mac) => {

    if(mac){
        return mac.split(':').length === 6? true : false;
    }

    return false;
}

const register = async (req, res, next) => {
    //TODO: register user
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
    const userExist = await findUser(userName);

    if(userExist){
        //user do exist in DB
        console.log('user exit');
        throw new FailMetaData(USER_EXIST_FAIL);
    }
    else{
        //user does not exist in DB
        console.log('user not exist');

        //get initial schema
        const registerSchema = getInitialSchema();

        //setup schema
        registerSchema.homeTel = userName;
        const hashedPassword = await bcrypt.hash(password, 10);
        registerSchema.password = hashedPassword;

        //insert user data into DB
        const result = await registerUser(registerSchema);
        console.log(result);
        const data = {
            userId: registerSchema.balAccount
        };
        res.success({data});
    } 
};

module.exports = register;