const express = require('express')
const User = require('../../models/registration')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Getting the profile info
exports.profile = async(req,res)=>{
    const token = req.body.token;
    

    if (!token) {

        console.log("No Token")
        res.status(200).json({ result: "Failed", message: "Need to relogin" })



    } else {

        const decode = jwt.verify(token, "TOP_SECRET", {ignoreExpiration: true});

        const email = decode.email
        try {
    
    const data = await User.findOne({email})
    console.log(data)
    res.status(200).json(data)
}catch(error){
    console.log(error)
}
}
}


exports.editprofile = async(req,res)=>{
    const token = req.body.token;
    const fName = req.body.fName
    const lName = req.body.lName
    

    if (!token) {

        console.log("No Token")
        res.status(200).json({ result: "Failed", message: "Need to relogin" })



    } else {

        const decode = jwt.verify(token, "TOP_SECRET", {ignoreExpiration: true});

        const email = decode.email
        try {
    
    const data = await User.findOneAndUpdate({email}, { $set: { fName: fName, lName: lName} }, { upsert: true })
    .then(result => {
        res.status(200).json({
            result: "success",
            message: "User updated successfully"
        });
    });
    console.log(data)
    res.status(200).json(data)
}catch(error){
    console.log(error)
}
}
}
