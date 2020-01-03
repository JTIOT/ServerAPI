const ip = require("ip");
const path = require('path');
const {
    generatToken,
    validateToken
 } = require('../Utils/tokenHandler');
const sendForgotPassMail = require('../Utils/email');

const {hashPassword} = require('../Utils/passwordHandler');

const {
    throwFail
} = require('../exceptionHandler/exceptionHandler');

const {
    USER_NOT_FOUND,
    USER_DO_NOT_HAVE_EMAIL,
    USER_ID_REQUIRE,
    TOKEN_REQUIRE,
    NEW_PASS_REQUIRE,
    RESET_PASS_FAIL
} = require('../exceptionHandler/fails/resetPassFails/resetPassFailTypes');

const {
    getUserInfoBy,
    updateUserPassword
} = require('../database/queryUtil/queryUtil');

/**
 * send user an E-mail for reseting password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const tokenExpiredDuration = 3600;//how long before token expired in seconds
const sendResetPassMail = async (req, res, next) => {
    const {userName} = req.body;

    const user = await getUserInfoBy({homeTel:userName});

    if(!user){
        //throw fail user not found
        throwFail(USER_NOT_FOUND);
    }

    if(!user.email){
        //throw fail user do not have email
        throwFail(USER_DO_NOT_HAVE_EMAIL);
    }

    const resetPassClientUrl = `http://${ip.address()}:3000/resetPassword`
    
    try{
        const token = await generatToken({
            userId: user.userId,
            userName: user.userName,
            email: user.email
        }, user.password, tokenExpiredDuration);

        const sender = 'abc@jtiot.net';
        const resetPassLink = `${resetPassClientUrl}/${user.userId}/${token}`;
        console.log('resetPass link ', resetPassLink);
        const templateVar = {
            userName: userName,
            link: resetPassLink,
            expiredTime: '1 hour'
        }
        await sendForgotPassMail(sender, user.email, 
            path.join(process.cwd(), 'emailTemplate','forgotPassTemp'),
            templateVar);
        res.success();
    }
    catch(err){
        throw err;
    }
}

/**
 * reset user password
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const resetPassword = async (req, res, next)=>{

    const {userId, newPassword, token} = req.body;

    if(!userId){
        //throw fail user id is required
        throwFail(USER_ID_REQUIRE);
    }

    if(!newPassword){
        //throw fail new password is required
        throwFail(NEW_PASS_REQUIRE);
    }

    if(!token){
        //throw fail token is required
        throwFail(TOKEN_REQUIRE);
    }

    console.log('reset pass for ', userId, newPassword, token);

    //hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    //get user's old password as secretkey
    //for token verification
    const user = await getUserInfoBy({balAccount:userId});
    const oldPass = user.password;
    
    //check token is valid with old password
    await validateToken(token, oldPass);
    
    //update password
    const updatePassSuccess = await updateUserPassword(userId, hashedPassword);
    if(!updatePassSuccess){
        throwFail(RESET_PASS_FAIL);
    }

    const data = {
        userId
    }
    res.success({data});
}

module.exports = {
    sendResetPassMail,
    resetPassword
}