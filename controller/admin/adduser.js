const mongoose = require('mongoose')
const express = require('express')
const user = require('../../models/registration')
const ADMIN = require('../../models/Admin')
const Admin = require('../../models/Admin')

//adduser on database using admin role
exports.adduser = async  (req, res) => {
    const roles = req.body.roles
    const data = new user({
        email : req.body.email,
        fName : req.body.fName,
        lName : req.body.lName,
        password : req.body.password,
        pNumber: req.body.pNumber,
        date: req.body.date,
        roles: req.body.roles,
        status: req.body.status
        
        
    })

    const admin = new Admin({
        email : req.body.email,
        fName : req.body.fName,
        lName : req.body.lName,
        password : req.body.password,
        pNumber: req.body.pNumber,
        date: req.body.date,
        roles: req.body.roles,
        status: req.body.status
    })

    //add user to user collection when adding a user that has "User" Role
    if(roles == "User"){
    try {
        const dataToSave = await data.save();
        console.log("Added Successfully")
        res.status(200).json(dataToSave)
    }
    catch (error) {
        console.log(1)
        res.status(400).json({message: error.message})
    }
    
    //add user to admin collection when adding a user that has "Admin" Role
}else{
    try {
        const dataToSave = await admin.save();
        console.log("Added Successfully")
        res.status(200).json(dataToSave)
    }
    catch (error) {
        console.log(1)
        res.status(400).json({message: error.message})
    }
}
}