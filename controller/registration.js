const bcrypt = require('bcrypt')
const User = require('../models/registration')
const mail = require('../middleware/mail')


//Sending email through nodemailer @ mail.js
exports.email = async (req, res, next) => {

    const { email } = req.body;

    if (email == null || !email) {
        return res.status(200).json({ result: "Failure", message: "Missing email." });

    } else {

        try {
            const existingUser = await User.findOne({ email }).exec();
            if (existingUser) {
                return res.status(200).json({
                    result: "Failure",
                    message: "Email is already in use."
                });
            } else {

                const link = "http://192.168.1.24:4200/create-pass"
                const user = await new User({
                    email: email
                }).save();
                mail(req.body.email, link)
                res.status(200).json({ result: "Success", message: "Continue", user })
                next();

            }
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }
}
//Create password
exports.password = async (req, res, next) => {
    const _id = req.params._id;
    const password = req.body.password;
    if (password == null || password.length <= 5) {

        res.status(200).json({ result: "Failure", message: "Password must be atleast 5 characters long" });

    } else {

        try {
            await bcrypt.hash(password, 10)
                .then(result => {
                    console.log(result)
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
            await User.findByIdAndUpdate(
                _id, { password }, { upsert: true, new: true })
                .then(result => {
                    res.status(200).json({
                        result: "success",
                        message: "User updated successfully"
                    });
                });

        } catch (error) {
            res.status(200).json({ result: "Failure", message: "Not valid" })
        }
    }
}
//Setting profile
exports.profile = async (req, res, next) => {
    try {
        const _id = req.params._id;

        const fName = req.body.fName
        const lName = req.body.lName
        const pNumber = req.body.pNumber
        const date = req.body.date

        await User.findByIdAndUpdate(
            _id, { $set: { fName: fName, lName: lName, pNumber: pNumber, date: date, status: "Completed" } }, { upsert: true })
            .then(result => {
                res.status(200).json({
                    result: "success",
                    message: "User updated successfully"
                });
            });

    } catch (error) {
        res.status(200).json({ result: "Failure", message: "Invalid Data" })
    }
}



