const ip = require("ip");
const path = require('path');
const tokenGenerator = require('../Utils/tokenGenerator');
const sendForgotPassMail = require('../Utils/email');

const sendResetPassMail = async (req, res, next) => {
    const {email} = req.body;

    try{
        const entryToken = await tokenGenerator({
            email
        });

        const sender = 'abc@jtiot.net';
        const templateVar = {
            userName: email,
            link: `${ip.address()}:${req.app.settings.port}/user/resetPassword?token=${entryToken}`
        }
        await sendForgotPassMail(sender, email, 
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