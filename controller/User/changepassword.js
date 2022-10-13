const express = require('express')
const User = require('../../models/registration')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const { mail } = require('./forgotpassword');


exports.changepassword = async (req, res) => {
    const token = req.body.token;
    const password = req.body.password

    if (!token) {

        console.log("No Token")
        res.status(200).json({ result: "Failed", message: "Need to relogin" })



    } else {

        const decode = jwt.verify(token, "TOP_SECRET");

        const email = decode.email
        try {

            await User.findOneAndUpdate(

                { email }, { password }, { upsert: true, new: true })
                .then(result => {
                    res.status(200).json({
                        result: "success",
                        message: "User updated successfully"
                    });
                });
        }
        catch (error) {
            console.log(error)
            // res.status(200).json({result:"Failed",message:"Need to relogin"})
        }

    }



}