const express = require('express')
const User = require('../../models/registration')



exports.edituser = async (req, res) => {
    const _id = req.params._id
    const email = req.body.email
    const lName = req.body.lName
    const fName = req.body.fName
    const password = req.body.password
    const pNumber = req.body.pNumber
    const date = req.body.date

        try {

            await User.findByIdAndUpdate(

                { _id }, {$set:{email:email, lName:lName,fName:fName,pNumber:pNumber,date:date} }, { upsert: true})
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



