const express = require('express')
const User = require('../models/registration')
const router = express.Router()

//Getting the profile info
exports.profile = async(req,res)=>{
    const email = req.body.email
    
    const data = await User.findOne({email})
    console.log(data)
    res.status(200).json(data)
}
