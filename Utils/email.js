const nodemailer = require('nodemailer');
const Email = require('email-templates');
const {mailConfig} = require('../config/config');

const mailTransport = nodemailer.createTransport(mailConfig);

mailTransport.verify((error, success)=>{
    if (error) {
        console.log(error);
    } else {
        console.log("Mail service is ready");
    }
})

const email = new Email({
    preview: false,
    send:true,
    transport: mailTransport
});

const sendMail = async (sender, receiver, templatePath, templateVar = {})=>{

    const result = await email
    .send({
      template: templatePath,
      message: {
        from:sender,
        to: receiver
      },
      locals: templateVar
    });

    console.log('mail sent ', result);
}

module.exports = sendMail;

