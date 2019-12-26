const ip = require("ip");
const path = require('path');
const tokenGenerator = require('../Utils/tokenGenerator');
const sendForgotPassMail = require('../Utils/email');

const {getUserInfo} = require('../database/queryUtil/queryUtil');

const sendResetPassMail = async (req, res, next) => {
    const {userName} = req.body;

    const user = await getUserInfo(userName);

    if(!user){
        //TODO:throw fail user not found
    }

    if(!user.email){
        //TODO:throw fail user do not have email
    }

    try{
        const entryToken = await tokenGenerator({
            userId:user.userId,
            userName:userName,
            email:user.email
        });

        const sender = 'abc@jtiot.net';
        const templateVar = {
            userName: userName,
            link: `${ip.address()}:${req.app.settings.port}/user/resetPassword?token=${entryToken}`
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

module.exports = {
    sendResetPassMail
}