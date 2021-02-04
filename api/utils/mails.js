const nodemailer = require("nodemailer");
var transporter = nodeMailer.createTransport({
    host: 'hostname',
    port: 587,
    secure:false,
    requireTLS:true,
    auth: {
      user:  process.env.MAILER  ,
      pass:   process.env.MAILERPASSWORD,
    }
  });
  
  const sendMail = (userMail, subject, mail) => {
    const mailConstruct =  {from: 'noresponse@emirburger.fr',
    to: userMail,
    subject: subject,
    text: mail,}
  
  
  transporter.sendMail(mailConstruct, function(error, data){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + data.response);
    }
  });
};
  module.exports = {sendMail }