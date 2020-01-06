const { 
    userExist,
    getUserInfoBy,
    getDeviceMacByUserKeyId
 } = require('../database/queryUtil/queryUtil');

const { throwFail } = require('../exceptionHandler/exceptionHandler');
const {
    USERNAME_REQUIRE,
    PASSWORD_REQUIRE,
    USER_NOT_EXIST,
    PASSWORD_INVALID,
    LOGIN_FAIL,
    USER_MAC_MISSING,

} = require('../exceptionHandler/fails/loginFails/loginFailTypes');

const {validatePassword} = require('../Utils/passwordHandler');
const generateAPIKey = require('../Utils/apiKeyGenerator');

const login = async (req, res, next) => {

    const { userName, password } = req.body;

    if(!userName){
        //throw user name is empty fail
        throwFail(USERNAME_REQUIRE);
    }

    if(!password){
        //throw password is empty fail
        throwFail(PASSWORD_REQUIRE)
    }

    //check if user name is exist in db
    const isUserExist = await userExist(userName);

    if(!isUserExist){
        //throw user name do not exist fail
        throwFail(USER_NOT_EXIST);
    }

    //get user info
    const userInfo = await getUserInfoBy({homeTel: userName});
    if(!userInfo){
        //throw fail error for login
        throwFail(LOGIN_FAIL)
    }
    
    //get user device mac
    const deviceMac = await getDeviceMacByUserKeyId(userInfo.keyId);
    if(!deviceMac){
        //thow mac missing fail
        throwFail(USER_MAC_MISSING);
    }

    //check password
    const isValidPassword = await validatePassword(password, userInfo.password);
 
    if(!isValidPassword){
        //throw password is not valid fail
        throwFail(PASSWORD_INVALID);
    }

    //generate api key
    const apiKey = await generateAPIKey({
        userId: userInfo.userId,
        userName: userInfo.userName
    });

    const data = {
        userId: userInfo.userId,
        userName: userInfo.userName,
        mac: deviceMac,
        apiKey: apiKey
    }

    res.success({data});
}

module.exports = login;