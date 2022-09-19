const express = require('express')
const nodemailer = require('nodemailer');
require('dotenv').config()

//Send code to the recipient for forgot password
const mail = (email, message) => {
    console.log('Mailing...............');
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
        text: `Your confirmation Pin is ${message}`
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