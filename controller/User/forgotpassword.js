const express = require('express')
const User = require('../../models/registration')
const mail1 = require('../../middleware/mailforgotpassword')
const bcrypt = require('bcrypt')
const router = express.Router();

//Sending code to email using nodemailer @ mailforgotpassword
exports.mail = async (req, res, next) => {
    try {
        const email = req.body.email
        code = Math.floor(100000 + Math.random() * 900000)

        await User.findOneAndUpdate(

            { email }, { $set: { code: code } }, { upsert: true, new: true })
            .then(result => {
                res.status(200).json({
                    result: "success",
                    message: "Code sent succesfully",
                    result
                });

                mail1(email, code)
                next();
            })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//Confirm code and then continue to change password
exports.confirmcode = async (req, res) => {
    const { _id, code } = req.body;
    const user = await User.findById({ _id })

    if (code == user.code) {
        res.status(200).json({ result: "Succesful", message: "Code matches" })
    } else {
        res.status(200).json({ result: "Failure", message: "Code doesn't Match" })
    }

}

//change password
exports.updatepassword = async (req, res) => {
    const { _id, password } = req.body;
    try {
        await User.findByIdAndUpdate(

            { _id }, { password, $unset: { code: 1 } }, { upsert: true, new: true })
            .then(result => {
                res.status(200).json({
                    result: "success",
                    message: "User updated successfully"
                });
            });
    }
    catch (error) {
    }
}