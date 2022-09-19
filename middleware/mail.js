const nodemailer = require('nodemailer');
require('dotenv').config()

//Sends link that has set password on the recipient email
const mail = (email, message) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.mail,
            pass: process.env.password
        }
    });

    var mailOptions = {
        from: process.env.mail,
        to: email,
        subject: 'EMAIL CONFIRMATION',
        text: `To Continue registration click here ->${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = mail;